package com.example.backend.Services.TerritoryService;
import com.example.backend.Entity.Territory;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import com.example.backend.Repository.TerritoryRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

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
    public void testGetTerritoryWithActiveEmpty() {
        Territory territory = Territory.builder()
                .title("Test Territory")
                .region("Test Region")
                .longitude(43.434)
                .latitude(44.456)
                .active(true)
                .build();
        List<Territory> territoryList = List.of(territory);
        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<Territory> mockPage = new PageImpl<>(territoryList, pageRequest, territoryList.size());
        Mockito.when(territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrCodeContainingIgnoreCase(
                        anyString(), anyString(), anyString(), any(PageRequest.class)))
                .thenReturn(mockPage);

        HttpEntity<?> result = underTest.getTerritory("", "search", 1, 10);
        Page<Territory> resultBody = (Page<Territory>) result.getBody();

        Assertions.assertEquals(territoryList, mockPage.getContent());
        assert resultBody != null;
        Assertions.assertEquals(mockPage.getContent(), resultBody.getContent());
    }


    @Test
    public void testGetTerritoryWithActiveTrue() {
        Territory territory = Territory.builder()
                .title("Test Territory")
                .region("Test Region")
                .longitude(43.434)
                .latitude(44.456)
                .active(true)
                .build();
        PageRequest pageRequest = PageRequest.of(0, 10);
        List<Territory> territoryList = List.of(territory);
        Page<Territory> mockPage = new PageImpl<>(territoryList, pageRequest, territoryList.size());
        Mockito.when(territoryRepo.findWhitSearch(true, "", pageRequest))
                .thenReturn(mockPage);
        HttpEntity<?> result = underTest.getTerritory("true", "search", 1, 10);
        Assertions.assertEquals(territoryList, mockPage.getContent());
    }

    @Test
    void itShouldEditTerritory() {
        //Given
        UUID id = UUID.randomUUID();
        ReqEditTerritory reqEditTerritory = new ReqEditTerritory("tit", "code", "region", true, 1, 2);

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

    @Test
    void itShouldGetAll() {
        //Given
        Territory territory1 = new Territory();
        List<Territory> mockTerritories = List.of(territory1);
        //When
        Mockito.when(territoryRepo.findAll()).thenReturn(mockTerritories);
        HttpEntity<?> all = underTest.getAll();
        //Then
        Assertions.assertEquals(mockTerritories,all.getBody());
    }
}