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
    @InjectMocks
    private TerritoryService territoryService;

    @Test
    void itShouldFindAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase() {

    }

    @Test
    void itShouldFindAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase() {
        //Given
        //When
        //Then
    }
}