package com.example.backend.Controller;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Services.ClientService.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/client")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> getClient(@RequestParam(defaultValue = "") String active,
                                   @RequestParam(defaultValue = "") String quickSearch,
                                   @RequestParam(defaultValue = "1") Integer page,
                                   @RequestParam(defaultValue = "5") Integer size,
                                   @RequestParam(defaultValue = "") String category,
                                   @RequestParam(defaultValue = "") String weekDay,
                                    @RequestParam(defaultValue = "") String  territory,
                                   @RequestParam(defaultValue = "") String  tin
    ) {
        return clientService.getClients(active, quickSearch, page, size, category, weekDay,territory, tin);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> addClient(@RequestBody ClientDTO clientDTO) {
        return clientService.addClient(clientDTO);
    }
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PutMapping("/{id}")
    public void editClient(@RequestBody ClientDTO clientDTO, @PathVariable UUID id) {
        System.out.println(clientDTO);
        clientService.editClient(clientDTO, id);
    }


}