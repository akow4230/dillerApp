package com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.response;

import lombok.Data;

@Data
public class Message {
    private Boolean ok;
    private Result result = new Result();
}