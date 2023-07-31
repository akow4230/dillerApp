package com.example.backend.Payload.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqTerritory {
    private String region;
    private String title;
    private String code;
    private int sorting;
    private boolean active;
    private double longitude;
    private double latitude;
}
