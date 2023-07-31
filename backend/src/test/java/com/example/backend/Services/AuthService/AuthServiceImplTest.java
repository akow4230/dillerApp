package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Enums.UserRoles;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Security.JwtService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.verification.VerificationMode;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceImplTest {
    private AuthServiceImpl authService;

    @Mock
    private UserRepo userRepo;

    @Mock
    private RoleRepo roleRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private UserDetailsService userDetailsService;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationConfiguration authenticationConfiguration;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authService = new AuthServiceImpl(
                userRepo,
                roleRepo,
                jwtService,
                userDetailsService,
                authenticationConfiguration,
                authenticationManager,
                passwordEncoder );
    }

    @Test
    void testLogin(){
        UserDTO userDTO1= new UserDTO("+998942488434","00000000", true);
        List<Role> role = new ArrayList<>();
        role.add(new Role(3, UserRoles.ROLE_SUPER_ADMIN));
        User user = User.builder()
                .phone("+998942488434")
                .password(passwordEncoder.encode("00000000"))
                .roles(role)
                .build();
        userRepo.save(user);
        Mockito.when(userRepo.findByPhone(userDTO1.getPhone())).thenReturn(Optional.of(user));

        Mockito.when(jwtService.generateJwtToken(user)).thenReturn("oo");
        Mockito.when(jwtService.generateJwtRefreshToken(user)).thenReturn("kk");
        Map<String, String> map= new HashMap<>();
        map.put("access_token",jwtService.generateJwtToken(user));
        map.put("refresh_token", jwtService.generateJwtRefreshToken(user));
        HttpEntity<?> result = authService.login(userDTO1);
        assertNotNull(result);
        Map<String, Object>mapSoxta= new HashMap<>();
        mapSoxta.put("access_token","oo");
        mapSoxta.put("refresh_token", "kk");
        mapSoxta.put("roles", role);
        Assertions.assertEquals(ResponseEntity.ok(mapSoxta), result);
    }

    @Test
    void testRefreshToken() {
        String refreshToken = "refresh_token";
        List<Role> role = new ArrayList<>();
        role.add(new Role(1, UserRoles.ROLE_SUPER_ADMIN));
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .phone("+998942488434")
                .password(passwordEncoder.encode("00000000"))
                .roles(role)
                .build();
        userRepo.save(user);
        String mockJwtToken = "mock.jwt.token";
        when(jwtService.extractSubjectFromJwt(mockJwtToken)).thenReturn(String.valueOf(userId));
        when(userRepo.findById(userId)).thenReturn(Optional.of(user));
        when(jwtService.generateJwtToken(user)).thenReturn("access_token");
        HttpEntity<?> result = authService.refreshToken(mockJwtToken);
        assertNotNull(result);
        assertEquals(ResponseEntity.ok("access_token"), result);
        verify(jwtService, times(1)).extractSubjectFromJwt(mockJwtToken);
        verify(userRepo, times(1)).findById(userId);
        verify(jwtService, times(1)).generateJwtToken(user);
    }

    @Test
    void testDecode() {
        String token = "mock_token";
        List<Role> roles = new ArrayList<>();
        roles.add(new Role(3, UserRoles.ROLE_SUPER_ADMIN));
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .phone("+998942488434")
                .password(passwordEncoder.encode("00000000"))
                .roles(roles)
                .build();
        when(userRepo.save(user)).thenReturn(user);
        when(jwtService.validateToken(token)).thenReturn(true);
        when(jwtService.extractSubjectFromJwt(token)).thenReturn(userId.toString());
        when(userRepo.findById(userId)).thenReturn(Optional.of(user));
        User decodedUser = authService.decode(token);
        assertNotNull(decodedUser);
        assertEquals(userId, decodedUser.getId());
        assertEquals("+998942488434", decodedUser.getPhone());
        verify(jwtService, times(1)).validateToken(token);
        verify(jwtService, times(1)).extractSubjectFromJwt(token);
        verify(userRepo, times(1)).findById(userId);
    }

}