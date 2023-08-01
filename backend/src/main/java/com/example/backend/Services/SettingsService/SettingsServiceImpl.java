package com.example.backend.Services.SettingsService;

import com.example.backend.Repository.SettingsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {
    private final SettingsRepo settingsRepo;

    @Override
    public HttpEntity<?> getSettings() {
        return ResponseEntity.ok(settingsRepo.findAll());
    }
}
