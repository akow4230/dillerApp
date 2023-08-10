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
     SELECT distinct
         c.id AS id,
         c.name AS name,
         c.address AS address,
         c.company AS company,
         c.territory_id as territory_id,
         c.phone AS phone,
         c.reference_point as reference_point,
         c.category_id as category_id,
         c.active AS active,
         c.date_of_registration AS date_of_registration,
         c.tin AS tin,
         c.latitude AS latitude,
         c.longitude AS longitude
     FROM client c
              JOIN customer_category cc ON cc.id = c.category_id
              JOIN client_week_day cwd on c.id = cwd.client_id
              JOIN territory t on t.id = c.territory_id
     WHERE
         (cc.id IN :categoryIds or 0 IN :categoryIds)
        AND (cwd.week_day_id IN :weekDayIds or 0 IN :weekDayIds)
        AND (
               (:territoryIds IS NULL) OR
               (t.id IN :territoryIds)
             )        
       AND (
             LOWER(c.phone || '' || c.address || '' || c.name || ' '||c.tin || c.reference_point || ''||c.company) LIKE LOWER(concat('%', :search, '%'))
         )
        AND(
           CASE
             WHEN :active = 'true' THEN c.active=true
             WHEN :active = 'false' THEN c.active=false
             ELSE true
             END
           )
        AND(
           CASE
             WHEN :tin = 'true' THEN c.tin IS NOT NULL AND c.tin != ''
             WHEN :tin = 'false' THEN c.tin IS NULL OR c.tin = ''
             ELSE true
             END
           )
        
""", nativeQuery = true)
    Page<Client> getClientsByActive(String active, String search, List<Integer> categoryIds, List<Integer> weekDayIds, String tin,List<UUID> territoryIds, PageRequest pageRequest);


}
