package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface ClientService {



    HttpEntity<?> addClient(ClientDTO clientDTO);

    HttpEntity<?> editClient(ClientDTO clientDTO, UUID id);
    HttpEntity<?> getClients(String active, String quickSearch, Integer page, Integer size, String category, String weekDay, String territory, String tin);

    HttpEntity<?> getAllClients();

    ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String quickSearch, String category, String weekDay, String territory, String tin, List<String> columns);
}
