package com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.entiy.MockData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MockClient {
    private Integer customCategoryId;
    private UUID territoryId;
    private String name;
    private String phone;
    private String address;
    private String inn;
    private Double longitude;
    private Double latitude;
}
