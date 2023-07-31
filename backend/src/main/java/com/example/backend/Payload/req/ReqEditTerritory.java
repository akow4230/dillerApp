package com.example.backend.Payload.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqEditTerritory {
    private String title;
    private String code;
    private boolean active;
    private double longitude;
    private double latitude;
}
