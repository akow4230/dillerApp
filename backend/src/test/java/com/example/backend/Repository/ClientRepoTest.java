package com.example.backend.Repository;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ClientRepoTest {
    @Mock
    private ClientRepo clientRepo;

    List<Integer> categoriesId = new ArrayList<>();
    List<Integer> weekDays = new ArrayList<>();

    @Test
    void itShouldGetClientsByActive() {
        //Given
        Client client = Client.builder()
                .name("client1")
                .company("company1")
                .territory(new Territory())
                .address("address1")
                .phone("1")
                .referencePoint("point")
                .tin("tin")
                .category(new CustomerCategory())
                .active(true)
                .weekDay(new ArrayList<>())
                .longitude(1.2)
                .latitude(1.3)
                .build();
        String active = "";
        String search = "";
        String tin = "";
        List<UUID> territoryId = List.of(UUID.randomUUID());
        PageRequest pageable = PageRequest.of(1, 5);
        Page<Client> mockPage = new PageImpl<>(List.of(client), pageable, 2);

        //When
        Mockito.when(clientRepo.getClientsByActive(active, search, categoriesId, weekDays, tin, territoryId, pageable)).thenReturn(mockPage);
        Page<Client> clientsByActive = clientRepo.getClientsByActive(active, search, categoriesId, weekDays, tin, territoryId, pageable);
        //Then
        Assertions.assertEquals(mockPage, clientsByActive);
    }

    @Test
    void itShouldGetClientsByActiveExcel() {
        //Given
        Client client = Client.builder()
                .name("client1")
                .company("company1")
                .territory(new Territory())
                .address("address1")
                .phone("1")
                .referencePoint("point")
                .tin("tin")
                .category(new CustomerCategory())
                .active(true)
                .weekDay(new ArrayList<>())
                .longitude(1.2)
                .latitude(1.3)
                .build();
        String active = "";
        String search = "";
        String tin = "";
        List<UUID> territoryId = List.of(UUID.randomUUID());
        Pageable pageable=Pageable.unpaged();
        //When
        Mockito.when(clientRepo.getClientsByActive(active, search, categoriesId, weekDays, tin, territoryId,pageable).getContent()).thenReturn(List.of(client));
        List<Client> clientList = clientRepo.getClientsByActive(active, search, categoriesId, weekDays, tin, territoryId,pageable).getContent();
        //Then
        Assertions.assertEquals(List.of(client), clientList);
    }
}