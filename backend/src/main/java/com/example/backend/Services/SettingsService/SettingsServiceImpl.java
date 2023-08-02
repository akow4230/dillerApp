package com.example.backend.Services.SettingsService;

import com.example.backend.Repository.SettingsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {
    private final SettingsRepo settingsRepo;

    @Override
    public HttpEntity<?> getSettings() {
        try {
            return ResponseEntity.ok(settingsRepo.findAll());
        } catch (Exception e) {
            // Handle the exception and return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching settings.");
        }
    }
}
