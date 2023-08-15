package com.example.backend.Controller;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Services.ClientService.ClientService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
                                   @RequestParam(defaultValue = "") String territory,
                                   @RequestParam(defaultValue = "") String tin
    ) {
        System.out.println(active);
        System.out.println(quickSearch);
        return clientService.getClients(active, quickSearch, page, size, category, weekDay, territory, tin);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/getExcel")
    public ResponseEntity<Resource> getExcel(HttpServletResponse response,
                                             @RequestParam(defaultValue = "") String active,
                                             @RequestParam(defaultValue = "") String quickSearch,
                                             @RequestParam(defaultValue = "") String category,
                                             @RequestParam(defaultValue = "") String weekDay,
                                             @RequestParam(defaultValue = "") String territory,
                                             @RequestParam(defaultValue = "") String tin
    ) throws IOException {
        return clientService.getExcel(response, active, quickSearch, category, weekDay, territory, tin);
    }


    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> getAllClient(
    ) {
        return clientService.getAllClients();
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