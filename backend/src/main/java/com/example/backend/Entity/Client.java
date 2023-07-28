package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne
    private Territory territory;
    private String name;
    private String address;
    private String phone;
    private String tin;
    private String companyName;
    private double longitude;
    private double latitude;

    @OneToOne
    private CustomerCategory category;

}
