package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.User;
import org.springframework.http.HttpEntity;

public interface CompanyService {
    HttpEntity<?> getInfo(String accessToken);

    HttpEntity<?> getCompanyProfile(Integer size, Integer page, User user, String quickSearch);
}
