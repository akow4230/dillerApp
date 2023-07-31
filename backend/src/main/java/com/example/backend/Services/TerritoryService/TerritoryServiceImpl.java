package com.example.backend.Services.TerritoryService;

import com.example.backend.Entity.Territory;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import com.example.backend.Repository.TerritoryRepo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService {
    private final TerritoryRepo territoryRepo;

    @Override
    public HttpEntity<?> addTerritory(ReqTerritory reqTerritory) {
        Territory newTerritory = Territory.builder()
                .region(reqTerritory.getRegion())
                .title(reqTerritory.getTitle())
                .code(reqTerritory.getCode())
                .active(reqTerritory.isActive())
                .longitude(reqTerritory.getLongitude())
                .latitude(reqTerritory.getLatitude())
                .build();
        territoryRepo.save(newTerritory);
        return ResponseEntity.ok("Territory is saved successfully");
    }

    @Override
    public HttpEntity<?> getTerritory(Boolean active, String search, Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        if (active == null) {
            Page<Territory> allTerritories = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(search, search, pageRequest);
            return ResponseEntity.ok(allTerritories);
        }
        Page<Territory> allByActive = territoryRepo.findAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(active, search, pageRequest);
        return ResponseEntity.ok(allByActive);
    }

    @Override
    public HttpEntity<?> getExcel(HttpServletResponse response, Boolean active, String search, Integer page, Integer size) {
//        PageRequest pageRequest = PageRequest.of(page - 1, size);
//        Page<Territory> resultPage;
//
//        if (active == null) {
//            resultPage = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(search, search, pageRequest);
//        } else {
//            resultPage = territoryRepo.findAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(active, search, pageRequest);
//        }
//
//        try (Workbook workbook = new XSSFWorkbook()) {
//            Sheet sheet = workbook.createSheet("Territory Data");
//
//            // Create header row
//            Row headerRow = sheet.createRow(0);
//            headerRow.createCell(0).setCellValue("ID");
//            headerRow.createCell(1).setCellValue("Region");
//            headerRow.createCell(2).setCellValue("Title");
//            headerRow.createCell(3).setCellValue("Code");
//            headerRow.createCell(4).setCellValue("Active");
//            headerRow.createCell(5).setCellValue("Longitude");
//            headerRow.createCell(6).setCellValue("Latitude");
//
//            // Create data rows
//            int rowNum = 1;
//            for (Territory territory : resultPage) {
//                Row row = sheet.createRow(rowNum);
//                row.createCell(0).setCellValue(territory.getId().toString());
//                row.createCell(1).setCellValue(territory.getRegion());
//                row.createCell(2).setCellValue(territory.getTitle());
//                row.createCell(3).setCellValue(territory.getCode());
//                row.createCell(4).setCellValue(territory.isActive());
//                row.createCell(5).setCellValue(territory.getLongitude());
//                row.createCell(6).setCellValue(territory.getLatitude());
//            }
//
//            try (FileOutputStream fileOut = new FileOutputStream("territory_data.xlsx")) {
//                workbook.write(fileOut);
//            }
//            System.out.println("Territory data exported to territory_data.xlsx");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return ResponseEntity.ok(resultPage);
        return ResponseEntity.ok("salom");
    }

    @Override
    public void editTerritory(UUID id, ReqEditTerritory reqEditTerritory) {
        Optional<Territory> territoryById = territoryRepo.findById(id);
        if (territoryById.isPresent()) {
            Territory EditingTerritory = territoryById.get();
            EditingTerritory.setId(id);
            EditingTerritory.setTitle(reqEditTerritory.getTitle());
            EditingTerritory.setCode(reqEditTerritory.getCode());
            EditingTerritory.setActive(reqEditTerritory.isActive());
            EditingTerritory.setLatitude(reqEditTerritory.getLatitude());
            EditingTerritory.setLongitude(reqEditTerritory.getLongitude());
            territoryRepo.save(EditingTerritory);
        } else {
            throw new IllegalArgumentException("Territory not found with ID: " + id);
        }
    }

}
