package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.User;
import com.example.backend.Projection.CompanyProfileProjection;
import com.example.backend.Projection.DashboardProjection;
import com.example.backend.Repository.CompanyRepo;
import com.example.backend.Services.AuthService.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepo companyRepo;
    private final AuthService authService;

    @Override
    public HttpEntity<?> getInfo(String accessToken) {
        User decode = authService.decode(accessToken);
        DashboardProjection dashboardInfo = companyRepo.getDashboardInfo(decode.getId());
        System.out.println(dashboardInfo);
        return ResponseEntity.ok(dashboardInfo);
    }

    @Override
    public HttpEntity<?> getCompanyProfile(Integer size, Integer page, User user, String quickSearch) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<CompanyProfileProjection> byCompanyId = companyRepo.findByCompanyId(pageRequest,quickSearch);
        return ResponseEntity.ok(byCompanyId);
    }
}
