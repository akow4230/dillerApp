package com.example.backend.Services.WeekService;

import com.example.backend.Entity.WeekDay;
import com.example.backend.Repository.WeekDayRepo;
import com.example.backend.Services.TerritoryService.TerritoryService;
import com.example.backend.Services.TerritoryService.TerritoryServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class WeekDayServiceImplTest {
    @Mock
    private WeekDayRepo weekDayRepo;
    @Mock
    private WeekDayServiceImpl underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new WeekDayServiceImpl(weekDayRepo);
    }

    @Test
    void itShouldGetWeekDays() {
        //Given
        WeekDay weekDay = new WeekDay();
        //When
        Mockito.when(weekDayRepo.findAll()).thenReturn(List.of(weekDay));
        HttpEntity<?> weekDays = underTest.getWeekDays();
        //Then
        Assertions.assertEquals(List.of(weekDay), weekDays.getBody());
    }
}