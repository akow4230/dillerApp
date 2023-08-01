package com.example.backend.Controller;

import com.example.backend.Enums.UserRoles;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import com.example.backend.Services.TerritoryService.TerritoryService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/territory")
@RequiredArgsConstructor
public class TerritoryController {
    private final TerritoryService territoryService;

    @PreAuthorize("hasRole(#UserRoles.ROLE_SUPER_ADMIN)")
    @PostMapping
    public HttpEntity<?> addTerritory(@RequestBody ReqTerritory reqTerritory) {
        return territoryService.addTerritory(reqTerritory);
    }
    @PreAuthorize("hasRole(#UserRoles.ROLE_SUPER_ADMIN)")
    @PutMapping("/{id}")
    public void editTerritory(@PathVariable UUID id, @RequestBody ReqEditTerritory reqEditTerritory) {
        territoryService.editTerritory(id, reqEditTerritory);
    }

    @GetMapping
    @PreAuthorize("hasRole(#UserRoles.ROLE_SUPER_ADMIN)")
    public HttpEntity<?> getTerritory(@RequestParam(defaultValue = "") Boolean Active,
                                      @RequestParam(defaultValue = "") String search,
                                      @RequestParam(defaultValue = "1") Integer page,
                                      @RequestParam(defaultValue = "5") Integer size) {
        return territoryService.getTerritory(Active, search, page, size);
    }

    @GetMapping("/getExcel")
    public HttpEntity<?> getExcel(HttpServletResponse response,
                                  @RequestParam(defaultValue = "") Boolean Active,
                                  @RequestParam(defaultValue = "") String search,
                                  @RequestParam(defaultValue = "1") Integer page,
                                  @RequestParam(defaultValue = "5") Integer size) {
        return territoryService.getExcel(response, Active, search, page, size);
    }
}