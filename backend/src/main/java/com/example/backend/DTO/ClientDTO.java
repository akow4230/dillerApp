package com.example.backend.DTO;

import com.example.backend.Entity.WeekDay;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {
    private String name;
    private String companyName;
    private UUID territory;
    private String address;
    private String phone;
    private String referencePoint;
    private String tin;
    private Integer category;
    private boolean active;
    private List<WeekDay> weekdays;
    private double longitude;
    private double latitude;
}
