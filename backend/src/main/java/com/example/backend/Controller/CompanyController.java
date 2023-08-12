package com.example.backend.Controller;

import com.example.backend.DTO.CurrentUser;
import com.example.backend.Entity.User;
import com.example.backend.Services.CompanyService.CompanyService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/company")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping("/dashboard")
    public HttpEntity<?> getDashboard(@CurrentUser User user) {
        return companyService.getInfo(user);
    }

    @GetMapping("/profile")
    public HttpEntity<?> getCompanyProfile(@CurrentUser User user,
                                           @RequestParam(defaultValue = "") String quickSearch,
                                           @RequestParam(defaultValue = "5") Integer size,
                                           @RequestParam(defaultValue = "1") Integer page) {
        System.out.println(quickSearch);
        return companyService.getCompanyProfile(size, page, user, quickSearch);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/profile/getExcel")
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, @RequestParam(defaultValue = "") String search,
                                             @RequestParam(defaultValue = "") String active
    ) throws IOException {
        return companyService.getExcel(response, search);
    }
}