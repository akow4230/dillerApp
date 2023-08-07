package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface ClientService {


    HttpEntity<?> getClients(String active, String quickSearch, Integer page, Integer size, String category, String weekDay);

    HttpEntity<?> addClient(ClientDTO clientDTO);

    void editClient(ClientDTO clientDTO, UUID id);
}
