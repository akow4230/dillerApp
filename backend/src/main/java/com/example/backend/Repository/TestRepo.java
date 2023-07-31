package com.example.backend.Repository;

import com.example.backend.Entity.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TestRepo extends JpaRepository<Test, Integer> {

    @Query(value = "SELECT * FROM test",nativeQuery = true)
    Page<Test> findAll(Pageable pageable);
}
