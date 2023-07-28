package com.example.backend.Services.CompanyService;

import com.example.backend.Projection.DashboardProjection;
import com.example.backend.Repository.CompanyRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService{
    private final CompanyRepo companyRepo;
    @Override
    public HttpEntity<?> getInfo() {
        System.out.println("Heelo");
        List<DashboardProjection> dashboardInfo = companyRepo.getDashboardInfo();
        System.out.println(dashboardInfo);
        return ResponseEntity.ok(dashboardInfo);
    }
}
