package com.example.backend.Controller;

import com.example.backend.Services.CustomerCategoryService.CustomerCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customercategory")
@RequiredArgsConstructor
public class CustomerCategoryController {
    private final CustomerCategoryService customerCategoryService;
    @GetMapping
    public HttpEntity<?> getCategory(){
        return customerCategoryService.getCategory();
    }
}
