package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Payload.req.ReqEditTerritory;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface CustomerCategoryService {

    HttpEntity<?> getCategory();
    HttpEntity<?> save(CustomerCategory category);

    HttpEntity<?> getFilterCategory(String active, String quickSearch, Integer page, Integer size);

    void editTerritory(Integer id, CustomerCategory reqEditTerritory);
}
