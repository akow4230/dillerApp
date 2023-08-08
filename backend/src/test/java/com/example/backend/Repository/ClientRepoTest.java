//package com.example.backend.Repository;
//
//import com.example.backend.Entity.Client;
//import com.example.backend.Entity.CustomerCategory;
//import com.example.backend.Entity.Territory;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//class ClientRepoTest {
//    @Mock
//    private ClientRepo clientRepo;
//
//    List<Integer> categoriesId = new ArrayList<>();
//    List<Integer> weekDays = new ArrayList<>();
//
//    @Test
//    void itShouldGetClientsByActive() {
//        //Given
//        Client client = Client.builder()
//                .name("client1")
//                .company("company1")
//                .territory(new Territory())
//                .address("address1")
//                .phone("1")
//                .referencePoint("point")
//                .tin("tin")
//                .category(new CustomerCategory())
//                .active(true)
//                .weekDay(new ArrayList<>())
//                .longitude(1.2)
//                .latitude(1.3)
//                .build();
//        Boolean active = false;
//        String search = "";
//
//        PageRequest pageable = PageRequest.of(1, 5);
//        Page<Client> mockPage = new PageImpl<>(List.of(client), pageable, 2);
//
//        //When
//        Mockito.when(clientRepo.getClientsByActive(active, search, categoriesId, weekDays, pageable)).thenReturn(mockPage);
//        Page<Client> clientsByActive = clientRepo.getClientsByActive(active, search, categoriesId, weekDays, pageable);
//        //Then
//        Assertions.assertEquals(mockPage, clientsByActive);
//    }
//
//    @Test
//    void itShouldGetClientsWithSearch() {
//        //Given
//        Boolean active = false;
//        String search = "";
//        Client client = Client.builder()
//                .name("client1")
//                .company("company1")
//                .territory(new Territory())
//                .address("address1")
//                .phone("1")
//                .referencePoint("point")
//                .tin("tin")
//                .category(new CustomerCategory())
//                .active(true)
//                .weekDay(new ArrayList<>())
//                .longitude(1.2)
//                .latitude(1.3)
//                .build();
//        //When
//        PageRequest pageable = PageRequest.of(1, 5);
//        Page<Client> mockPage = new PageImpl<>(List.of(client), pageable, 2);
//        Mockito.when(clientRepo.getClientsWithSearch(search, categoriesId, weekDays, pageable)).thenReturn(mockPage);
//        Page<Client> clientsWithSearch = clientRepo.getClientsWithSearch(search, categoriesId, weekDays, pageable);
//        //Then
//        Assertions.assertEquals(mockPage, clientsWithSearch);
//    }
//}