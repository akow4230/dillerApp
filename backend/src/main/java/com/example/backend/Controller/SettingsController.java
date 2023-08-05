package com.example.backend.Controller;

import com.example.backend.Services.SettingsService.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/settings")
public class SettingsController {
    private final SettingsService settingsService;
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")

    @GetMapping
    public HttpEntity<?> getSettings(){
        return settingsService.getSettings();
    }

}
