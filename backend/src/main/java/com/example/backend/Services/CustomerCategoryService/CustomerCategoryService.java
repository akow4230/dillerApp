package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Payload.req.ReqEditTerritory;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.UUID;

public interface CustomerCategoryService {

    HttpEntity<?> getCategory();
    HttpEntity<?> save(CustomerCategory category);

    HttpEntity<?> getFilterCategory(String active, String quickSearch, Integer page, Integer size);

    void editTerritory(Integer id, CustomerCategory reqEditTerritory);

    ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String s) throws IOException;
}
