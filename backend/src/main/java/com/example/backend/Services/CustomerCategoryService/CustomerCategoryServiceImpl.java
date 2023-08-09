package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Payload.req.ReqEditTerritory;
import com.example.backend.Repository.CustomerCategoryRepo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImpl implements CustomerCategoryService {
    private final CustomerCategoryRepo customerCategoryRepo;


    @Override
    public HttpEntity<?> getCategory() {
        List<CustomerCategory> all = customerCategoryRepo.findAll();
        System.out.println(all);
        return ResponseEntity.ok(all);
    }

    @Override
    public HttpEntity<?> save(CustomerCategory category) {
        return ResponseEntity.ok(customerCategoryRepo.save(category));
    }

    public Page<CustomerCategory> getCategoryFilter(String active, String search, PageRequest pageRequest) {
        Page<CustomerCategory> allTerritories = null;
        if (Objects.equals(active, "")) {
            allTerritories = customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderById(search, pageRequest);
            return allTerritories;
        }
        allTerritories = customerCategoryRepo.findAllByActiveAndTitleContainingIgnoreCase(Boolean.valueOf(active), search, pageRequest);
        return allTerritories;
    }

    @Override
    public HttpEntity<?> getFilterCategory(String active, String quickSearch, Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<CustomerCategory> territoryFilter = getCategoryFilter(active, quickSearch, pageRequest);
        return ResponseEntity.ok(territoryFilter);
    }

    @Override
    public void editTerritory(Integer id, CustomerCategory reqEditTerritory) {
        Optional<CustomerCategory> byId = customerCategoryRepo.findById(id);
        if (byId.isPresent()) {
            CustomerCategory customerCategory = byId.get();
            customerCategory.setActive(reqEditTerritory.isActive());
            customerCategory.setTitle(reqEditTerritory.getTitle());
            customerCategory.setCode(reqEditTerritory.getCode());
            customerCategory.setDescription(reqEditTerritory.getDescription());
            customerCategoryRepo.save(customerCategory);
        } else {
            throw new IllegalArgumentException("Territory not found with ID: " + id);
        }
    }

    @Override
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String search) throws IOException {
        List<CustomerCategory> customerCategories = null;
        if (Objects.equals(active, "undefined")) {
            customerCategories = customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderById(search);
        } else {
            System.out.println(active);
            customerCategories = customerCategoryRepo.findAllByActiveAndTitleContaining(Boolean.valueOf(active), search);
        }
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Category info");
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex()); // Choose the color you want
        cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        Font headerFont = workbook.createFont();
        headerFont.setFontHeightInPoints((short) 15);
        headerFont.setColor(IndexedColors.WHITE.getIndex()); // Set font color for the header row
        cellStyle.setFont(headerFont);
        Row row = sheet.createRow(0);
        row.createCell(0).setCellValue("ID");
        row.createCell(1).setCellValue("Title");
        row.createCell(2).setCellValue("Code");
        row.createCell(3).setCellValue("Description");
        row.createCell(4).setCellValue("Active");
        for (int i = 0; i < 5; i++) {
            row.getCell(i).setCellStyle(cellStyle);
            sheet.autoSizeColumn(i);
        }
        int counter = 1;
        for (CustomerCategory territory : customerCategories) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            dataRow.createCell(0).setCellValue(territory.getId().toString());
            dataRow.createCell(1).setCellValue(territory.getTitle());
            dataRow.createCell(2).setCellValue(territory.getCode());
            dataRow.createCell(3).setCellValue(territory.getDescription());
            dataRow.createCell(4).setCellValue(territory.isActive() ? "active" : "No active");
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=CustomerCategoryInfo.xlsx");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(resource);
    }


}
