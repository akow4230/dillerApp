package com.example.backend.Services.Security;

import org.springframework.http.HttpEntity;

public interface SecurityService {
    HttpEntity<?> checkSecurity(String authorization);
}
