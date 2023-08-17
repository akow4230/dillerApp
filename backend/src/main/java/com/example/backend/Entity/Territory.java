package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "territory")
@Entity
@Builder
public class Territory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String region;
    private String title;
    private String code;
    private boolean active;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;
    @Column(unique = true)
    private double longitude;
    @Column(unique = true)
    private double latitude;

}

