package com.example.backend.Repository;

import com.example.backend.Entity.Territory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TerritoryRepo extends JpaRepository<Territory, UUID> {
    @Query(value = """
            SELECT * from territory where lower((territory.title||''||territory.region) ||''|| territory.code) like lower(concat('%',:search,'%')) and active=:active
            """, nativeQuery = true)
    Page<Territory> findWhitSearch(Boolean active, String search, PageRequest pageRequest);

    Page<Territory> findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrCodeContainingIgnoreCase(String title, String region, String code, PageRequest pageRequest);


    List<Territory> findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrderByRegion(String title, String region);
    @Query(value = """
            SELECT * from territory where lower((territory.title||''||territory.region) ||''|| territory.code) like lower(concat('%',:search,'%')) and active=:active
            """, nativeQuery = true)
    List<Territory> findAllByActiveAndRegionAndTitle(Boolean active, String search);
}
