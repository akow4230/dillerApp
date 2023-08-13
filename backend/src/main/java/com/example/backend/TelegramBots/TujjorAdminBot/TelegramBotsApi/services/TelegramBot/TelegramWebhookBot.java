package com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.services.TelegramBot;

import com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.services.Execute.Execute;
import com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.services.Execute.ExecuteImpl;
import org.telegram.telegrambots.meta.api.objects.Update;

public interface TelegramWebhookBot {
    Execute execute = new ExecuteImpl();
    void onUpdateReceived(Update update);

}