package com.example.backend.Controller;

import com.example.backend.Entity.Role;
import com.example.backend.Services.Security.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/security")
public class SecurityController {
    @Autowired
    private SecurityService securityService;
    @GetMapping
    public HttpEntity<?> checkSecurity(@RequestHeader("Authorization") String authorization){
        System.out.println(authorization);
        HttpEntity<?> httpEntity = securityService.checkSecurity(authorization);
        System.out.println(httpEntity.getBody());
        return httpEntity;
    }
}
