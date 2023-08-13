package com.example.backend.Repository;

import com.example.backend.Entity.TelegramUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TelegramUserRepo extends JpaRepository<TelegramUser, UUID> {
    TelegramUser findByChatId(Long chatId);
}
