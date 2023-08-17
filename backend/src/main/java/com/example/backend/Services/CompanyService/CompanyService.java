package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CompanyService {
    HttpEntity<?> getInfo(User user);

    HttpEntity<?> getCompanyProfile(Integer size, Integer page, User user, String quickSearch);

    ResponseEntity<Resource> getExcel(HttpServletResponse response, String s, User user, List<String> columns);
}
