package com.example.backend.Controller;

import com.example.backend.Enums.UserRoles;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import com.example.backend.Services.TerritoryService.TerritoryService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/territory")
@RequiredArgsConstructor
public class TerritoryController {
    private final TerritoryService territoryService;

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PostMapping
    public HttpEntity<?> addTerritory(@RequestBody ReqTerritory reqTerritory) {
        return territoryService.addTerritory(reqTerritory);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PutMapping("/{id}")
    public void editTerritory(@PathVariable UUID id, @RequestBody ReqEditTerritory reqEditTerritory) {
        territoryService.editTerritory(id, reqEditTerritory);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> getTerritory(@RequestParam(defaultValue = "") String active,
                                      @RequestParam(defaultValue = "") String quickSearch,
                                      @RequestParam(defaultValue = "1") Integer page,
                                      @RequestParam(defaultValue = "5") Integer size


    ) {
        return territoryService.getTerritory(active, quickSearch, page, size);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/getExcel")
    public ResponseEntity<Resource> getExcel(HttpServletResponse response,
                                             @RequestParam(defaultValue = "") String active,
                                             @RequestParam(defaultValue = "") String quickSearch,
                                             @RequestParam(defaultValue = "") List<String> columns
    ) throws IOException {
        if (quickSearch.equals("")){
            return territoryService.getExcel(response, active, "",columns);
        }else {
            return territoryService.getExcel(response, active, quickSearch,columns);
        }
    }


    @GetMapping("/all")
    public HttpEntity<?> getAllTerritory(){
        return territoryService.getAll();
    }

}
