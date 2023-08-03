package com.example.backend.Repository;

import com.example.backend.Entity.CustomerCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerCategoryRepo extends JpaRepository<CustomerCategory, Integer> {
}
