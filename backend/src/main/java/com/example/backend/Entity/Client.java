package com.example.backend.Entity;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Entity.User;
import com.example.backend.Entity.WeekDay;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String company;

    @OneToOne
    private User agent;

    @OneToOne
    private Territory territory;

    private String address;
    private String phone;
    private String referencePoint;
    private String tin;

    @OneToOne
    private CustomerCategory category;

    private boolean active;
    private LocalDate dateOfRegistration;
    private String typeOfEquipment;
    private String equipment;

    @ManyToMany
    private List<WeekDay> weekDay;

    private double longitude;
    private double latitude;
}
