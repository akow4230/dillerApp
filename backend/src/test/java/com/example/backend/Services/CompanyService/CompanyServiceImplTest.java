package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.User;
import com.example.backend.Projection.DashboardProjection;
import com.example.backend.Repository.CompanyRepo;
import com.example.backend.Services.AuthService.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CompanyServiceImplTest {

    @Mock
    private CompanyRepo companyRepo;

    @Mock
    private AuthService authService;

    @Mock
    private CompanyServiceImpl underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
       underTest= new CompanyServiceImpl(companyRepo);
    }

    @Test
    void itShouldGetInfo() {
        UUID userId = UUID.randomUUID();
//        String accessToken = "mock_access_token";
        User mockUser = new User();
        mockUser.setId(userId);

        DashboardProjection mockProjection = mock(DashboardProjection.class);
//        when(authService.decode(accessToken)).thenReturn(mockUser);
        when(companyRepo.getDashboardInfo(userId)).thenReturn(mockProjection);

        DashboardProjection response = (DashboardProjection) underTest.getInfo(mockUser).getBody();

        assertEquals(mockProjection, response);
    }
}
