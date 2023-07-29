package com.example.backend.Services.AuthService;

import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

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

//    @Test
//    void testLogin(){
//        UserDTO userDTO1= new UserDTO("+998942488434","00000000", true);
//        UserDTO userDTO2= new UserDTO("+998942488434","11111111", false);
//        authService.login()
//    }

}