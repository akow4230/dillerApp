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
    //    @Query("SELECT c from Client c where lower(c.name || '' || c.address || '' || c.phone) LIKE lower(concat('%',:search,'%'))" +
//            " and c.active=:active"
//
//    )
//    Page<Client> findAllByActiveAndNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(Boolean active, String search, PageRequest pageRequest, Integer categoryIds);
//    @Query(value = """
//            SELECT * from client join customer_category cc on cc.id = client.category_id
//            where cc.id in (1) and client.name like lower('%' || :search || '%') and client.active = :active
//            """, nativeQuery = true)
//    Page<Client> findAllByActiveAndNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(Boolean active, String search, PageRequest pageRequest);
    @Query(value = """
    SELECT c.id AS id,
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
    WHERE cc.id IN :categoryIds
        AND LOWER(c.name) LIKE LOWER(concat('%', :search, '%'))
        AND c.active = :active or 0 IN :categoryIds AND LOWER(c.name) LIKE LOWER(concat('%', :search, '%'))
        AND c.active = :active
    """, nativeQuery = true)
    Page<Client> findAllByActiveAndNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(Boolean active, String search, @Param("categoryIds") List<Integer> categoryIds, PageRequest pageRequest);
    @Query(value = """
    SELECT c.id AS id,
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
    WHERE cc.id IN :categoryIds
        AND (
        LOWER(c.name) LIKE LOWER(concat('%', :search, '%'))
        OR LOWER(c.address) LIKE LOWER(concat('%', :search, '%'))
        OR LOWER(c.phone) LIKE LOWER(concat('%', :search, '%'))
        )
        or 0 IN :categoryIds  AND (
        LOWER(c.name) LIKE LOWER(concat('%', :search, '%'))
        OR LOWER(c.address) LIKE LOWER(concat('%', :search, '%'))
        OR LOWER(c.phone) LIKE LOWER(concat('%', :search, '%'))
        )
    """, nativeQuery = true)
    Page<Client> findAllByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(String search,List<Integer> categoryIds, PageRequest pageRequest);

}
