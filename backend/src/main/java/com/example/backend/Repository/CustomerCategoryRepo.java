package com.example.backend.Repository;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerCategoryRepo extends JpaRepository<CustomerCategory, Integer> {

    Page<CustomerCategory> findAllByTitleContainingIgnoreCaseOrderById(String search, PageRequest pageRequest);
    @Query(value = """
            SELECT * from customer_category where lower(customer_category.title) like lower(concat('%',:search,'%')) and active=:active order by customer_category.id
            """, nativeQuery = true)
    Page<CustomerCategory> findAllByActiveAndTitleContainingIgnoreCase(Boolean active, String search, PageRequest pageRequest);
}
