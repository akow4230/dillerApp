package com.example.backend.Repository;

import com.example.backend.Entity.Territory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TerritoryRepo extends JpaRepository<Territory, UUID> {
    @Query(value = """
            SELECT * from territory t where lower((t.title||''||t.region) ||''|| t.code) like lower(concat('%',:search,'%')) and active=:active order by t.created_at desc
            """, nativeQuery = true)
    Page<Territory> findWhitSearch(Boolean active, String search, Pageable pageRequest);

    Page<Territory> findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrCodeContainingIgnoreCaseOrderByCreatedAtAsc(String title, String region, String code, Pageable pageRequest);
}
