package com.example.backend.Services.CompanyService;

import org.springframework.http.HttpEntity;

public interface CompanyService {
    HttpEntity<?> getInfo(String accessToken);

    HttpEntity<?> getCompanyProfile(Integer id);
}
