package com.example.backend.Services.TerritoryService;

import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.UUID;

public interface TerritoryService {
    HttpEntity<?> addTerritory(ReqTerritory reqTerritory);

    HttpEntity<?> getTerritory(String active, String search, Integer page, Integer size);

    ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String search) throws IOException;

    void editTerritory(UUID id, ReqEditTerritory reqEditTerritory);
}
