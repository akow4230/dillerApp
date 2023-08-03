package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    @OneToMany
    private List<Company> company;
    @OneToOne
    private User agent;
    @OneToOne
    private Territory territory;
    private String address;
    private String phone;
    private String referencePoint;
    @OneToOne
    private CustomerCategory category;
    private boolean activity;
    private LocalDate dateOfRegistration;
    private String typeOfEquipment;
    private String equipment;

}
