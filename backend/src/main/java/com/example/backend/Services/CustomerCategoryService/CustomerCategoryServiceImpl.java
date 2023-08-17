package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.ExcelTools;
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
import org.springframework.data.domain.Pageable;
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

import static com.example.backend.Services.CompanyService.CompanyServiceImpl.*;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImpl implements CustomerCategoryService {
    private final CustomerCategoryRepo customerCategoryRepo;

    @Override
    public HttpEntity<?> getCategory() {
        List<CustomerCategory> all = customerCategoryRepo.findAll();
        return ResponseEntity.ok(all);
    }

    @Override
    public HttpEntity<?> save(CustomerCategory category) {
        return ResponseEntity.ok(customerCategoryRepo.save(category));
    }

    @Override
    public HttpEntity<?> getFilterCategory(String active, String quickSearch, Integer page, Integer size) {
        Pageable pageRequest = PageRequest.of(page - 1, size);
        Page<CustomerCategory> categoryFilter = getCategoryFilter(active, quickSearch, pageRequest);
        return ResponseEntity.ok(categoryFilter);
    }

    @Override
    public void editCustomerCategory(Integer id, CustomerCategory reCustomerCategory) {
        Optional<CustomerCategory> byId = customerCategoryRepo.findById(id);
        if (byId.isPresent()) {
            CustomerCategory customerCategory = byId.get();
            customerCategory.setActive(reCustomerCategory.isActive());
            customerCategory.setTitle(reCustomerCategory.getTitle());
            customerCategory.setCode(reCustomerCategory.getCode());
            customerCategory.setDescription(reCustomerCategory.getDescription());
            customerCategoryRepo.save(customerCategory);
        } else {
            throw new IllegalArgumentException("Category not found with ID: " + id);
        }
    }

    @Override
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String search) throws IOException {
        Pageable pageable=Pageable.unpaged();
        List<CustomerCategory> customerCategories = null;
        if (Objects.equals(active, "")) {
            customerCategories = customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderByIdDesc(search,pageable).getContent();
        } else {
            customerCategories = customerCategoryRepo.findBySearch(Boolean.valueOf(active), search,pageable).getContent();
        }
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Category info");
        CellStyle cellStyle = ExcelTools.createHeaderCellStyle(workbook);
        createHeaderRow(sheet, cellStyle);
        generateColumns(customerCategories, sheet);
        ExcelTools.autoSizeColumns(sheet);
        return getResourceResponseEntity(workbook);
    }

    private static void generateColumns(List<CustomerCategory> customerCategories, Sheet sheet) {
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
    }

    private void createHeaderRow(Sheet sheet, CellStyle cellStyle) {
        Row headerRow = sheet.createRow(0);
        String[] headers = {
                "ID", "Title", "Code", "Description", "Active"
        };

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(cellStyle);
            sheet.autoSizeColumn(i);
        }
    }
    public Page<CustomerCategory> getCategoryFilter(String active, String search, Pageable pageRequest) {
        Page<CustomerCategory> customerCategories = null;
        if (Objects.equals(active, "")) {
            customerCategories = customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderByIdDesc(search, pageRequest);
            return customerCategories;
        }
        customerCategories = customerCategoryRepo.findBySearch(Boolean.valueOf(active), search, pageRequest);
        return customerCategories;
    }


}
