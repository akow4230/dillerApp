package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.CustomerCategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImpl implements CustomerCategoryService {
    private final CustomerCategoryRepo customerCategoryRepo;


    @Override
    public HttpEntity<?> getCategory() {
        List<CustomerCategory> all = customerCategoryRepo.findAll();
        System.out.println(all);
        return ResponseEntity.ok(all);
    }

    @Override
    public HttpEntity<?> save(CustomerCategory category) {
        return ResponseEntity.ok(customerCategoryRepo.save(category));
    }
    public Page<CustomerCategory> getCategoryFilter(String active, String search, PageRequest pageRequest) {
        Page<CustomerCategory> allTerritories = null;
        if (Objects.equals(active, "")) {
            allTerritories = customerCategoryRepo.findAllByTitleContainingIgnoreCase(search, pageRequest);
            return allTerritories;
        }
        allTerritories = customerCategoryRepo.findAllByActiveAndTitleContainingIgnoreCase(Boolean.valueOf(active), search, pageRequest);
        return allTerritories;
    }
    @Override
    public HttpEntity<?> getFilterCategory(String active, String quickSearch, Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<CustomerCategory> territoryFilter = getCategoryFilter(active, quickSearch, pageRequest);
        return ResponseEntity.ok(territoryFilter);
    }

}
