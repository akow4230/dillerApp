package com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.response;

import lombok.Data;

@Data
public class ChatMember {
    private Boolean ok;
    private ResultMember result = new ResultMember();
}
