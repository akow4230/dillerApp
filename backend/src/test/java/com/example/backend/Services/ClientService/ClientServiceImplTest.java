package com.example.backend.Services.ClientService;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Entity.WeekDay;
import com.example.backend.Enums.WeekDays;
import com.example.backend.Repository.ClientRepo;
import com.example.backend.Repository.CustomerCategoryRepo;
import com.example.backend.Repository.TerritoryRepo;
import com.example.backend.Repository.UserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ClientServiceImplTest {
    @Mock
    private ClientService underTest;
    @Mock
    private ClientRepo clientRepo;
    @Mock
    private TerritoryRepo territoryRepo;
    @Mock
    private UserRepo userRepo;
    @Mock
    private CustomerCategoryRepo customerCategoryRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new ClientServiceImpl(clientRepo, userRepo, territoryRepo, customerCategoryRepo);
    }

//    @Test
//    void itShouldGetClients() {
//        //Given
//        String active = "";
//        String search = "tit";
//        int page = 2;
//        int size = 5;
//        String tin = "";
//        String territory = "";
//        String category = "";
//        String weekday = "";
//        PageRequest pageRequest = PageRequest.of(page - 1, size);
//        Territory territory1 = new Territory(UUID.randomUUID(), "reg", "tit", "code", true, 1.2, 2.4);
//        Client client = Client.builder()
//                .id(UUID.randomUUID())
//                .phone("123")
//                .dateOfRegistration(LocalDate.now())
//                .longitude(1.2)
//                .name("name")
//                .latitude(2.3)
//                .company("com")
//                .address("add")
//                .tin("tin")
//                .category(new CustomerCategory(1, "t", "c", "", true))
//                .referencePoint("")
//                .weekDay(List.of(new WeekDay(1, WeekDays.FRIDAY)))
//                .territory(territory1)
//                .build();
//        Page<Client> mockClients = new PageImpl<>(List.of(client), pageRequest, List.of(client).size());
//        List<Integer> categoryIds = List.of(1, 2);
//        List<Integer> weekDayIds = List.of(1, 2);
//        List<UUID> territoryIds = List.of(UUID.randomUUID());
//
//        //When
//        Mockito.when(clientRepo.getClientsByActive(active, search, categoryIds, weekDayIds, tin, territoryIds, pageRequest)).thenReturn(mockClients);
//        HttpEntity<?> response = underTest.getClients(active, search, page, size, category, weekday, territory, tin);
//        //Then
//        List<Client> content = mockClients.getContent();
//        Object body = response.getBody();
//
//        Assertions.assertEquals(content, body);
//    }

    @Test
    void itShouldGetAllClients() {
        //Given
        //When
        //Then
    }

    @Test
    void itShouldGetExcel() {
        //Given
        //When
        //Then
    }

    @Test
    void itShouldAddClient() {
        //Given
        //When
        //Then
    }

    @Test
    void itShouldEditClient() {
        //Given
        //When
        //Then
    }
}