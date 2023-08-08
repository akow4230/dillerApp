package com.example.backend.Payload.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResClient {
    private UUID id;
    private String name;
    private String company;
    private UUID agentId;
    private UUID territoryId;
    private String address;
    private String phone;
    private String referencePoint;
    private Integer categoryId;
    private Boolean active;
    private LocalDate dateOfRegistration;
    private String typeOfEquipment;
    private String equipment;
    private String tin;
    private Double latitude;
    private Double longitude;
}
