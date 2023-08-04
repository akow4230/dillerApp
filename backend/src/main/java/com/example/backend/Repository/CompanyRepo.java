package com.example.backend.Repository;

import com.example.backend.Entity.Company;
import com.example.backend.Projection.CompanyProfileProjection;
import com.example.backend.Projection.DashboardProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CompanyRepo extends JpaRepository<Company, Integer> {
    @Query(value = "SELECT support_phone as support_phone, now() as current_date_and_time FROM company WHERE company.owner_id = :id", nativeQuery = true)
    DashboardProjection getDashboardInfo(UUID id);

    @Query(value = """
            SELECT 
            c.id, c.email,
            c.name as companyName, 
            c.region, 
            c.support_phone as supportPhone,
            u.phone as name,t.title 
            from company c 
             join company_territory ct on c.id = ct.company_id
             join territory t on t.id = ct.territory_id
             join users u on c.owner_id = u.id
             where lower(c.name||''||c.region) like lower(concat('%',:search,'%'))
                """, nativeQuery = true)
    Page<CompanyProfileProjection> findByCompanyId(PageRequest pageRequest, String search);
}
