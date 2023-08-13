package com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.controller;

import com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.services.TelegramBot.TelegramWebhookBot;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.telegram.telegrambots.meta.api.objects.Update;


@RestController
@RequestMapping("/api/v1/bot")
@RequiredArgsConstructor
public class BotController {
    private final TelegramWebhookBot bot;
    @PostMapping
    public void onUpdateReceived(@RequestBody Update update) {
        bot.onUpdateReceived(update);
    }
}
