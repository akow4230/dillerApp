package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Enums.UserRoles;
import com.example.backend.Payload.req.ReqLogin;
import com.example.backend.Payload.req.ReqLogin;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Security.JwtService;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo usersRepository;
    private final RoleRepo roleRepo;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @SneakyThrows
    @Override
    public HttpEntity<?> register(ReqLogin loginReq) {
        List<Role> roles = new ArrayList<>();
        List<Role> roleUser = roleRepo.findAllByName(UserRoles.ROLE_USER.toString());
        if (roleUser == null) {
            roles.add(roleRepo.save(new Role(1, UserRoles.ROLE_USER.toString())));
        } else {
            roles.add(roleUser.get(0));
        }
        User user = new User(loginReq.getPhone(), passwordEncoder.encode(loginReq.getPassword()), roles);
        usersRepository.save(user);
        return ResponseEntity.ok(null);
    }

    private String getToken(ReqLogin loginReq) throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginReq.getPhone());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                loginReq.getPassword(),
                userDetails.getAuthorities()
        );

        authenticationConfiguration.getAuthenticationManager().authenticate(authenticationToken);

        String token = Jwts
                .builder()
                .setIssuer(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(jwtService.getSigningKey())
                .compact();
        return token;
    }

    @Override
    public HttpEntity<?> login(UserDTO userDTO) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getPhone(), userDTO.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok("BAD_CREDENTIALS");
        }
        User users = usersRepository.findByPhone(userDTO.getPhone()).orElseThrow(() -> new RuntimeException("Cannot find User With Phone:" + userDTO.getPhone()));
        List<Role> roles = roleRepo.findAll();
        Map<String, Object> map = new HashMap<>();
        map.put("access_token", jwtService.generateJwtToken(users));
        map.put("refresh_token", jwtService.generateJwtRefreshToken(users));
        map.put("roles", roles);
        return ResponseEntity.ok(map);
    }

    @Override
    public HttpEntity<?> refreshToken(String refreshToken) {
        String id = jwtService.extractSubjectFromJwt(refreshToken);
        User users = usersRepository.findById(UUID.fromString(id)).orElseThrow();
        String access_token = jwtService.generateJwtToken(users);
        return ResponseEntity.ok(access_token);
    }

    @Override
    public HttpEntity<?> decode(String token) {
        boolean isExpired = jwtService.validateToken(token);
        User user = null;
        if (isExpired) {
            String userId = jwtService.extractSubjectFromJwt(token);
            user = usersRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("Cannot find User With Id:" + userId));
        }
        return ResponseEntity.ok(user);
    }
}
