package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.glassfish.grizzly.http.util.TimeStamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String company;
    @ManyToOne
    private Territory territory;
    private String address;
    private String phone;
    private String referencePoint;
    private String tin;
    @ManyToOne
    private CustomerCategory category;
    private boolean active;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime dateOfRegistration;
    @ManyToMany
    private List<WeekDay> weekDay;
    private double longitude;
    private double latitude;
}
