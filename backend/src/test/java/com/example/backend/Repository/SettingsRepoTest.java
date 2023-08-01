package com.example.backend.Repository;

import com.example.backend.Entity.Settings;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SettingsRepoTest {
    @Mock
    private SettingsRepo settingsRepo;

    @Test
    void itShouldFindALl() {
        Settings settings = new Settings(1, "a", "b");
        Mockito.when(settingsRepo.findAll()).thenReturn(List.of(settings));
        List<Settings> all = settingsRepo.findAll();

        Assertions.assertEquals(List.of(settings), all);
    }
}