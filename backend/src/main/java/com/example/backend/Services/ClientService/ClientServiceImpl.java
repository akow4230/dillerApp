package com.example.backend.Services.ClientService;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.ClientRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepo clientRepo;


    private Page<Client> getClientFilter(String active, String search, PageRequest pageRequest) {
        Page<Client> allClient = null;
        if (Objects.equals(active, "")) {
            allClient = clientRepo.findAllByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(search, search, search, pageRequest);
            return allClient;
        }
        allClient = clientRepo.findAllByActiveAndNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(Boolean.valueOf(active), search, pageRequest);
        return allClient;
    }


    @Override
    public HttpEntity<?> getClients(String active, String quickSearch, Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        return ResponseEntity.ok(getClientFilter(active, quickSearch, pageRequest));
    }
}
