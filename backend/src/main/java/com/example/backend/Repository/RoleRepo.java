package com.example.backend.Repository;


import com.example.backend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    List<Role> findAllByName(String name);
}
