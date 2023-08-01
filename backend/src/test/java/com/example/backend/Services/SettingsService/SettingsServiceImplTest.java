package com.example.backend.Services.SettingsService;

import com.example.backend.Entity.Settings;
import com.example.backend.Repository.SettingsRepo;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class SettingsServiceImplTest {
    @Mock
    private SettingsService underTest;
    @Mock
    private SettingsRepo settingsRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new SettingsServiceImpl(settingsRepo);
    }

    @Test
    void itShouldGetSettings() {
        //Given
        Settings setting1 = new Settings(1, "Setting 1", "Value 1");
        Settings setting2 = new Settings(1, "Setting 2", "Value 2");
        List<Settings> settings = Arrays.asList(setting1, setting2);
        when(settingsRepo.findAll()).thenReturn(settings);
        //When
        HttpEntity<?> response = underTest.getSettings();
        //Then
        Assertions.assertThat(response.getBody()).isEqualTo(settings);
    }
}