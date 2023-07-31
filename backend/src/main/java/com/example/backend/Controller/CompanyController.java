package com.example.backend.Controller;

import com.example.backend.Enums.UserRoles;
import com.example.backend.Services.CompanyService.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/company")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping("/dashboard")
    public HttpEntity<?> getDashboard(@RequestHeader("Authorization") String authorization) {
        return companyService.getInfo(authorization);
    }
}