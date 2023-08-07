package com.example.backend.Services.ClientService;

import org.springframework.http.HttpEntity;

public interface ClientService {

    HttpEntity<?> getClients(String active, String quickSearch, Integer page, Integer size, String category, String weekDay, String territory, String tin);
}
