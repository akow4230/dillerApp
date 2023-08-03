package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Repository.CustomerCategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImpl implements CustomerCategoryService {
    private final CustomerCategoryRepo customerCategoryRepo;


    @Override
    public HttpEntity<?> getCategory() {
        return ResponseEntity.ok(customerCategoryRepo.findAll());
    }
}
