package com.example.backend.Services.TerritoryService;

import com.example.backend.Entity.Territory;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import com.example.backend.Repository.TerritoryRepo;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService {
    private final TerritoryRepo territoryRepo;

    @Override
    public HttpEntity<?> addTerritory(ReqTerritory reqTerritory) {
        Territory newTerritory = Territory.builder()
                .region(reqTerritory.getRegion() + "2")
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
    public HttpEntity<?> getTerritory(String active, String search, Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<Territory> territoryFilter = getTerritoryFilter(active, search, pageRequest);
        return ResponseEntity.ok(territoryFilter);
    }

    private Page<Territory> getTerritoryFilter(String active, String search, PageRequest pageRequest) {
        Page<Territory> allTerritories = null;
        if (Objects.equals(active, "")) {
            allTerritories = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(search, search, pageRequest);
            return allTerritories;
        }
        allTerritories = territoryRepo.findAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase(Boolean.valueOf(active), search, pageRequest);
        return allTerritories;
    }

    @Override
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String search) throws IOException {
        List<Territory> territoryFilter = null;
        if (Objects.equals(active, "")) {
            territoryFilter = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrderByRegion(search, search);
        } else {
            System.out.println(active);
            territoryFilter = territoryRepo.findAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrderByRegion(Boolean.valueOf(active), search, search);
        }
        System.out.println(territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrderByRegion(search, search));
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Company info");
        Row row = sheet.createRow(0);
        row.createCell(0).setCellValue("ID");
        row.createCell(1).setCellValue("Region");
        row.createCell(2).setCellValue("Title");
        row.createCell(3).setCellValue("Code");
        row.createCell(4).setCellValue("Active");
        row.createCell(5).setCellValue("Longitude");
        row.createCell(6).setCellValue("Latitude");
        int counter = 1;
        System.out.println(territoryFilter);
        for (Territory territory : territoryFilter) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            dataRow.createCell(0).setCellValue(territory.getId().toString());
            dataRow.createCell(1).setCellValue(territory.getRegion());
            dataRow.createCell(2).setCellValue(territory.getTitle());
            dataRow.createCell(3).setCellValue(territory.getCode());
            dataRow.createCell(4).setCellValue(territory.isActive());
            dataRow.createCell(5).setCellValue(territory.getLongitude());
            dataRow.createCell(6).setCellValue(territory.getLatitude());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=CompanyInfo.xlsx");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(resource);
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
            EditingTerritory.setRegion(reqEditTerritory.getRegion());
            territoryRepo.save(EditingTerritory);
        } else {
            throw new IllegalArgumentException("Territory not found with ID: " + id);
        }
    }

}
