package com.example.backend.Services.TerritoryService;

import com.example.backend.Entity.Territory;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import com.example.backend.Repository.TerritoryRepo;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.ss.usermodel.Sheet;
//import org.apache.poi.ss.usermodel.Workbook;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
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
        System.out.println(allTerritories);
        return allTerritories;
    }

    @Override
    public void getExcel(HttpServletResponse response, String active, String search, Integer page, Integer size) throws IOException {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<Territory> territoryFilter = getTerritoryFilter(active, search, pageRequest);

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Company info");
        HSSFRow row = sheet.createRow(0);
        row.createCell(0).setCellValue("ID");
        row.createCell(1).setCellValue("Region");
        row.createCell(2).setCellValue("Title");
        row.createCell(3).setCellValue("Code");
        row.createCell(4).setCellValue("Active");
        row.createCell(5).setCellValue("Longitude");
        row.createCell(6).setCellValue("Latitude");

        int counter = 1;
        for (Territory territory : territoryFilter.getContent()) {
            HSSFRow dataRow = sheet.createRow(counter);
            dataRow.createCell(0).setCellValue(territory.getId().toString());
            dataRow.createCell(1).setCellValue(territory.getRegion());
            dataRow.createCell(2).setCellValue(territory.getTitle());
            dataRow.createCell(3).setCellValue(territory.getCode());
            dataRow.createCell(4).setCellValue(territory.isActive());
            dataRow.createCell(5).setCellValue(territory.getLongitude());
            dataRow.createCell(6).setCellValue(territory.getLatitude());
            counter++;
        }
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
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
