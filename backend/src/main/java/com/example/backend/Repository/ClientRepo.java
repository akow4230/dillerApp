package com.example.backend.Repository;

import com.example.backend.Entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ClientRepo extends JpaRepository<Client, UUID> {

    @Query(value = """
            SELECT DISTINCT
              c.*
            FROM client c
                right JOIN customer_category cc ON cc.id = c.category_id
                right JOIN client_week_day cwd on c.id = cwd.client_id
                right JOIN territory t on t.id = c.territory_id
            WHERE
                ( cc.id IN :categoryIds OR 0 IN :categoryIds)
                AND ( cwd.week_day_id IN :weekDayIds OR 0 IN :weekDayIds)
              AND ((:territoryIds IS NULL) OR(t.id IN :territoryIds))
              AND (LOWER(c.phone || '' || c.address || '' || c.name || ' '||c.tin || c.reference_point || ''||c.company) LIKE LOWER(concat('%', :search, '%')))
                AND (
                    (:active='' ) OR
                    ( cast(c.active as varchar) = :active)
                )
                AND (
                    (:tin='')OR
                    (:tin='true'  AND  c.tin != '')OR
                    ( :tin='false' AND c.tin = '')
                )
            order by c.id
""", nativeQuery = true)
    Page<Client> getClientsByActive(String active, String search, List<Integer> categoryIds, List<Integer> weekDayIds, String tin,List<UUID> territoryIds, PageRequest pageRequest);


}
