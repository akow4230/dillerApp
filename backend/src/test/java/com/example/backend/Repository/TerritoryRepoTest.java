package com.example.backend.Repository;

import com.example.backend.Entity.Territory;
import com.example.backend.Services.TerritoryService.TerritoryService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TerritoryRepoTest {
    @Mock
    private TerritoryRepo territoryRepo;

    @Test
    void itShouldFindAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase() {
        Territory territory = new Territory(
                null, "1reg", "1title", "1code", true, 1.1, 1.2
        );
        Territory territory2 = new Territory(
                null, "2reg", "2title", "2code", true, 1.1, 1.2
        );
        boolean active = true;
        String search = "tit";
        PageRequest pageable = PageRequest.of(1, 5);
        Page<Territory> mockPage = new PageImpl<>(Arrays.asList(territory, territory2), pageable, 2);
        when(territoryRepo.findAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(active, search, pageable)).thenReturn(mockPage);

        Page<Territory> territoryPage = territoryRepo.findAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(active, search, pageable);
        assertEquals(mockPage, territoryPage);

    }

    @Test
    void itShouldFindAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase() {
        Territory territory = new Territory(
                null, "1reg", "1title", "1code", true, 1.1, 1.2
        );
        Territory territory2 = new Territory(
                null, "2reg", "2title", "2code", true, 1.1, 1.2
        );
        String title = "tit";
        String region = "reg";
        PageRequest pageable = PageRequest.of(1, 5);
        Page<Territory> mockPage = new PageImpl<>(Arrays.asList(territory, territory2), pageable, 2);

        when(territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(title, region, pageable)).thenReturn(mockPage);

        Page<Territory> territoryPage = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(title, region, pageable);
        assertEquals(mockPage, territoryPage);
    }
}