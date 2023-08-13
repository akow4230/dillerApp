package com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.response;

import lombok.Data;

@Data
public class File {
    private Boolean ok;
    private FileResult result = new FileResult();
}
