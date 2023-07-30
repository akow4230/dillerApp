package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.User;
import com.example.backend.Projection.DashboardProjection;
import com.example.backend.Repository.CompanyRepo;
import com.example.backend.Services.AuthService.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService{
    private final CompanyRepo companyRepo;
    private final AuthService authService;
    @Override
    public HttpEntity<?> getInfo(String accessToken) {
        User decode = authService.decode(accessToken);
        DashboardProjection dashboardInfo = companyRepo.getDashboardInfo(decode.getId());
        return ResponseEntity.ok(dashboardInfo);
    }
}
