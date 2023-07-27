package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Payload.LoginReq;
import org.springframework.http.HttpEntity;

public interface AuthService {
    HttpEntity<?> register(LoginReq dto);
    HttpEntity<?> login(UserDTO dto);
    HttpEntity<?> refreshToken(String refreshToken);
    HttpEntity<?> decode(String token);
}
