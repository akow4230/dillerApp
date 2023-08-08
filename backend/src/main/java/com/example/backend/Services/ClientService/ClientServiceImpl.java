package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Repository.ClientRepo;
import com.example.backend.Repository.CustomerCategoryRepo;
import com.example.backend.Repository.TerritoryRepo;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepo clientRepo;
    private final UserRepo userRepo;
    private final TerritoryRepo territoryRepo;
    private final CustomerCategoryRepo categoryRepo;


    @Override
    public ResponseEntity<?> getClients(String active, String quickSearch, Integer page, Integer size, String category, String weekDay, String territory, String tin) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        List<Integer> categoryIds = getIdes(category);
        List<Integer> weekDayIds = getIdes(weekDay);
        List<UUID> territoryIds = getUUIDes(territory);

        return ResponseEntity.ok(clientRepo.getClientsByActive(active, quickSearch, categoryIds, weekDayIds, tin, territoryIds, pageRequest));
    }

    @Override
    public HttpEntity<?> getAllClients() {
        return ResponseEntity.ok( clientRepo.findAll());
    }

    private static List<Integer> getIdes(String word) {
        List<Integer> getIdes = new LinkedList<>();
        if (!word.isEmpty()) {
            String[] strArr = word.split(",");
            for (String s : strArr) {
                getIdes.add(Integer.valueOf(s));
            }
        } else {
            getIdes.add(0);
        }
        return getIdes;
    }

    private static List<UUID> getUUIDes(String word) {
        List<UUID> getIdes = new LinkedList<>();
        if (!word.isEmpty()) {
            String[] strArr = word.split(",");
            for (String s : strArr) {
                getIdes.add(UUID.fromString(s));
            }
        }
        return getIdes;
    }

    @Override
    public HttpEntity<?> addClient(ClientDTO clientDTO) {
        Client client = Client.builder()
                .name(clientDTO.getName())
                .company(clientDTO.getCompanyName())
                .territory(territoryRepo.findById(clientDTO.getTerritory()).get())
                .address(clientDTO.getAddress())
                .phone(clientDTO.getPhone())
                .referencePoint(clientDTO.getReferencePoint())
                .tin(clientDTO.getTin())
                .category(categoryRepo.findById(clientDTO.getCategory()).get())
                .active(clientDTO.isActive())
                .dateOfRegistration(LocalDate.now())
                .weekDay(clientDTO.getWeekdays())
                .longitude(clientDTO.getLongitude())
                .latitude(clientDTO.getLatitude())
                .build();
        clientRepo.save(client);
        return ResponseEntity.ok("Client Saved successfully");
    }

    @Override
    public void editClient(ClientDTO clientDTO, UUID id) {
        Client currentClient = clientRepo.findById(id).orElseThrow();
        currentClient.setId(id);
        currentClient.setName(clientDTO.getName());
        currentClient.setCompany(clientDTO.getCompanyName());
        currentClient.setTerritory(territoryRepo.findById(clientDTO.getTerritory()).orElseThrow());
        currentClient.setAddress(clientDTO.getAddress());
        currentClient.setPhone(clientDTO.getPhone());
        currentClient.setReferencePoint(clientDTO.getReferencePoint());
        currentClient.setTin(clientDTO.getTin());
        currentClient.setCategory(categoryRepo.findById(clientDTO.getCategory()).orElseThrow());
        currentClient.setWeekDay(clientDTO.getWeekdays());
        currentClient.setLongitude(clientDTO.getLongitude());
        currentClient.setLatitude(clientDTO.getLatitude());
        clientRepo.save(currentClient);
    }
}

