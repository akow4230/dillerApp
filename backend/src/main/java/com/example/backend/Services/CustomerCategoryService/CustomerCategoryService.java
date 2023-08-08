package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Entity.CustomerCategory;
import org.springframework.http.HttpEntity;

public interface CustomerCategoryService {

    HttpEntity<?> getCategory();
    HttpEntity<?> save(CustomerCategory category);

    HttpEntity<?> getFilterCategory(String active, String quickSearch, Integer page, Integer size);
}
