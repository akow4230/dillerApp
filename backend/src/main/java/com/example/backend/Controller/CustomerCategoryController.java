package com.example.backend.Controller;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Services.CustomerCategoryService.CustomerCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customercategory")
@RequiredArgsConstructor
public class CustomerCategoryController {
    private final CustomerCategoryService customerCategoryService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> getCategory(){
        return customerCategoryService.getCategory();
    }
    @GetMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> getFilterCategory(
            @RequestParam(defaultValue = "") String active,
            @RequestParam(defaultValue = "") String quickSearch,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "5") Integer size
    ){
        return customerCategoryService.getFilterCategory(active, quickSearch, page, size);
    }
    @PostMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    private HttpEntity<?> saveCategory(@RequestBody CustomerCategory category){
        return customerCategoryService.save(category);
    }
}
