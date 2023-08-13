package com.example.backend.Entity;

import com.example.backend.Enums.BotState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "telegram_users")
public class TelegramUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private Long chatId;
    @Enumerated(value = EnumType.STRING)
    private BotState state;
    private Integer messageId;
    @Transient
    private int currentPage;
    public TelegramUser(Long chatId, BotState state) {
        this.chatId = chatId;
        this.state = state;
    }
}
