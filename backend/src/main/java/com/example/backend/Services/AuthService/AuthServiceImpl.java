package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Payload.LoginReq;
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
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final AuthenticationManager authenticationManager;

    @SneakyThrows
    @Override
    public HttpEntity<?> register(LoginReq dto) {
        List<Role> roles = new ArrayList<>();
        List<Role> roleUser = roleRepo.findAllByName("ROLE_USER");
        if (roleUser == null) {
            roles.add(roleRepo.save(new Role(0, "ROLE_USER")));
        } else {
            roles.add(roleUser.get(0));
        }
        User user = new User(
                null,
                dto.getUsername(),
                dto.getPassword(),
                roles
        );
        usersRepository.save(user);


        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                dto.getPassword(),
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
        return ResponseEntity.ok(token);
    }

    @Override
    public HttpEntity<?> login(UserDTO dto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok("BAD_CREDENTIALS");
        }
        ;
        User users = usersRepository.findByPhone(dto.getUsername()).orElseThrow(() -> new RuntimeException("Cannot find User With Id:" + dto.getUsername()));
        List<Role> roles = roleRepo.findAll();
        String access_token = jwtService.generateJwtToken(users);
        String refresh_token = jwtService.generateJwtRefreshToken(users);
        Map<String, Object> map = new HashMap<>();
        map.put("access_token", access_token);
        map.put("refresh_token", refresh_token);
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
