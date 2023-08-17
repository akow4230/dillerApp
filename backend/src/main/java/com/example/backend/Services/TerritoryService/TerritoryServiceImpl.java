package com.example.backend.Services.TerritoryService;

import com.example.backend.Entity.Territory;
import com.example.backend.ExcelTools;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Payload.req.ReqTerritory;
import com.example.backend.Repository.TerritoryRepo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import static com.example.backend.Services.CompanyService.CompanyServiceImpl.getResourceResponseEntity;

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
                .createdAt(LocalDateTime.now())
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

    @Override
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String search) throws IOException {
        List<Territory> territoryFilter = null;
        Pageable pageable=Pageable.unpaged();
        if (Objects.equals(active, "")) {
            territoryFilter = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrCodeContainingIgnoreCaseOrderByCreatedAtAsc(search, search,search,pageable).getContent();
        } else {
            territoryFilter = territoryRepo.findWhitSearch(Boolean.valueOf(active), search,pageable).getContent();
        }
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Company info");
        CellStyle cellStyle = ExcelTools.createHeaderCellStyle(workbook);
        createHeaderRow(sheet, cellStyle);
        generateColumns(territoryFilter, sheet);
        ExcelTools.autoSizeColumns(sheet);
        return getResourceResponseEntity(workbook);
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

    @Override
    public HttpEntity<?> getAll() {
        List<Territory> all = territoryRepo.findAll();
        return ResponseEntity.ok(all);
    }

    private Page<Territory> getTerritoryFilter(String active, String search, PageRequest pageRequest) {
        Page<Territory> allTerritories = null;
        if (Objects.equals(active, "")) {
            allTerritories = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrCodeContainingIgnoreCaseOrderByCreatedAtAsc(search, search, search, pageRequest);
            return allTerritories;
        }
        allTerritories = territoryRepo.findWhitSearch(Boolean.valueOf(active), search, pageRequest);
        return allTerritories;
    }

    private static void generateColumns(List<Territory> territoryFilter, Sheet sheet) {
        int counter = 1;
        for (Territory territory : territoryFilter) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            dataRow.createCell(0).setCellValue(territory.getId().toString());
            dataRow.createCell(1).setCellValue(territory.getRegion());
            dataRow.createCell(2).setCellValue(territory.getTitle());
            dataRow.createCell(3).setCellValue(territory.getCode());
            dataRow.createCell(4).setCellValue(territory.isActive() ? "active" : "No active");
            dataRow.createCell(5).setCellValue(territory.getLongitude());
            dataRow.createCell(6).setCellValue(territory.getLatitude());
        }
    }

    private void createHeaderRow(Sheet sheet, CellStyle cellStyle) {
        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Region", "Title", "Code", "Active", "Longitude", "Latitude"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(cellStyle);
            sheet.autoSizeColumn(i);
        }
    }
}
