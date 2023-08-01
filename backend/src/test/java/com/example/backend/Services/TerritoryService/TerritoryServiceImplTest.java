package com.example.backend.Services.TerritoryService;

import com.example.backend.Entity.Territory;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import com.example.backend.Repository.TerritoryRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;

import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class TerritoryServiceImplTest {
    @Mock
    private TerritoryService underTest;
    @Mock
    private TerritoryRepo territoryRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new TerritoryServiceImpl(territoryRepo);
    }

    @Test
    void itShouldAddTerritory() {
        //Given
        ReqTerritory reqTerritory = new ReqTerritory("reg", "tit", "code", true, 1, 2);
        Territory newTerritory = Territory.builder()
                .region(reqTerritory.getRegion() + "2")
                .title(reqTerritory.getTitle())
                .code(reqTerritory.getCode())
                .active(reqTerritory.isActive())
                .longitude(reqTerritory.getLongitude())
                .latitude(reqTerritory.getLatitude())
                .build();
        //When
        Mockito.when(territoryRepo.save(newTerritory)).thenReturn(newTerritory);
        HttpEntity<?> httpEntity = underTest.addTerritory(reqTerritory);
        //Then
        assertEquals(httpEntity.getBody(), "Territory is saved successfully");
        assertEquals(reqTerritory.getCode(), newTerritory.getCode());
    }

    @Test
    void itShouldGetTerritoryByActive() {
        //Given
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
        //When
        Mockito.when(territoryRepo.findAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(active, search, pageable)).thenReturn(mockPage);
        Page<Territory> territoryPage = territoryRepo.findAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(active, search, pageable);
        //Then
        assertEquals(mockPage, territoryPage);

    }

    @Test
    void itShouldGetTerritoryActiveNull() {
        //Given
        Territory territory = new Territory(
                null, "1reg", "1title", "1code", true, 1.1, 1.2
        );
        Territory territory2 = new Territory(
                null, "2reg", "2title", "2code", true, 1.1, 1.2
        );
        //When
        String title = "tit";
        String region = "reg";
        PageRequest pageable = PageRequest.of(1, 5);
        Page<Territory> mockPage = new PageImpl<>(Arrays.asList(territory, territory2), pageable, 2);
        Mockito.when(territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(title, region, pageable)).thenReturn(mockPage);
        Page<Territory> territoryPage = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(title, region, pageable);
        //Then
        assertEquals(mockPage, territoryPage);
    }

    @Test
    void itShouldEditTerritory() {
        //Given
        UUID id = UUID.randomUUID();
        ReqEditTerritory reqEditTerritory = new ReqEditTerritory("tit", "code", true, 1, 2);

        Territory editingterritory = new Territory(
                id, "reg",
                reqEditTerritory.getTitle(),
                reqEditTerritory.getCode(), reqEditTerritory.isActive(),
                reqEditTerritory.getLongitude(), reqEditTerritory.getLatitude()
        );
        //When
        Mockito.when(territoryRepo.findById(id)).thenReturn(Optional.of(editingterritory));
        Mockito.when(territoryRepo.save(editingterritory)).thenReturn(editingterritory);
        underTest.editTerritory(id, reqEditTerritory);
        //Then
        Mockito.verify(territoryRepo).save(Mockito.argThat(territory -> territory.getId().equals(id)
                && territory.getTitle().equals(reqEditTerritory.getTitle())
                && territory.getCode().equals(reqEditTerritory.getCode())
                && territory.isActive() == reqEditTerritory.isActive()
                && territory.getLatitude() == (reqEditTerritory.getLatitude())
                && territory.getLongitude() == (reqEditTerritory.getLongitude())));
    }
}