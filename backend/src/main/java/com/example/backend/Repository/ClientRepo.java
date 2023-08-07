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
           c.territory_id as territory_id,
           c.reference_point as reference_point,
           c.category_id as category_id,
           c.phone AS phone,
           c.active AS active,
           c.date_of_registration AS date_of_registration,
           c.type_of_equipment AS type_of_equipment,
           c.equipment AS equipment,
           c.agent_id AS agent_id
    FROM client c
             JOIN customer_category cc ON cc.id = c.category_id
             JOIN client_week_day cwd on c.id = cwd.client_id
    WHERE   
        cc.id IN :categoryIds or 0 IN :categoryIds
        AND cwd.week_day_id IN :weekDayIds or 0 IN :weekDayIds
        AND (
            LOWER(c.name) LIKE LOWER(concat('%', :search, '%'))
            OR LOWER(c.address) LIKE LOWER(concat('%', :search, '%'))
            OR LOWER(c.phone) LIKE LOWER(concat('%', :search, '%'))
            )
        AND c.active = :active
    """, nativeQuery = true)
    Page<Client> findAllByActiveAndNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(Boolean active, String search,List<Integer> categoryIds, List<Integer> weekDayIds, PageRequest pageRequest);




//    active bo'sh kelganda
    @Query(value = """
    SELECT distinct
                     c.id AS id,
                     c.name AS name,
                     c.address AS address,
                     c.territory_id as territory_id,
                     c.reference_point as reference_point,
                     c.category_id as category_id,
                     c.phone AS phone,
                     c.active AS active,
                     c.date_of_registration AS date_of_registration,
                     c.type_of_equipment AS type_of_equipment,
                     c.equipment AS equipment,
                     c.agent_id AS agent_id
              FROM client c
                       JOIN customer_category cc ON cc.id = c.category_id
                       JOIN client_week_day cwd on c.id = cwd.client_id
              WHERE
                      cc.id IN :categoryIds or 0 IN :categoryIds
                  AND cwd.week_day_id IN :weekDayIds or 0 IN :weekDayIds
                  AND (
                          LOWER(c.name) LIKE LOWER(concat('%', :search, '%'))
                      OR LOWER(c.address) LIKE LOWER(concat('%', :search, '%'))
                      OR LOWER(c.phone) LIKE LOWER(concat('%', :search, '%'))
                  )
    """, nativeQuery = true)
    Page<Client> findAllByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(String search,List<Integer> categoryIds, List<Integer> weekDayIds, PageRequest pageRequest);

}
