package com.example.backend.Repository;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.Territory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ClientRepo extends JpaRepository<Client, UUID> {
    @Query(value = """
            SELECT * from client where lower(client.name||''||client.address||''||client.phone) like lower(concat('%',:search,'%')) and active=:active
            """, nativeQuery = true)
    Page<Client> findAllByActiveAndNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(Boolean active, String search, PageRequest pageRequest);

    Page<Client> findAllByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(String name, String address,String phone, PageRequest pageRequest);

}
