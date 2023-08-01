package com.example.backend.Services.SettingsService;

import org.springframework.http.HttpEntity;

public interface SettingsService {
    HttpEntity<?> getSettings();
}
