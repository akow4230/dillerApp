package com.example.backend.Controller;

import com.example.backend.Services.CompanyService.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @GetMapping("/dashboard")
    public HttpEntity<?> getDashboard(){
        return companyService.getInfo();
    }
}