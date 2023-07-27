package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Role implements GrantedAuthority {
    @Id
    private int id;
    @Column(unique = true, nullable = false)
    private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
