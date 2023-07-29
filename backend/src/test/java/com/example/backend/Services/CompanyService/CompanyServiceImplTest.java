package com.example.backend.Services.CompanyService;

import com.example.backend.Projection.DashboardProjection;
import com.example.backend.Repository.CompanyRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class CompanyServiceImplTest {

    @Mock
    private CompanyRepo companyRepo;

    private CompanyServiceImpl underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new CompanyServiceImpl(companyRepo);
    }

    @Test
    void itShouldGetInfo() {
        DashboardProjection mockProjection = Mockito.mock(DashboardProjection.class);
        when(companyRepo.getDashboardInfo()).thenReturn(List.of(mockProjection));
        HttpEntity<?> result = underTest.getInfo();
        assertEquals(ResponseEntity.ok(mockProjection), result);
    }
}
