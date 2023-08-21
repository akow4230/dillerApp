package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.ExcelTools;
import com.example.backend.Projection.CompanyProfileProjection;
import com.example.backend.Repository.CustomerCategoryRepo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

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
        try{
            return ResponseEntity.ok(customerCategoryRepo.save(category));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the customer category");
        }
    }

    @Override
    public HttpEntity<?> getFilterCategory(String active, String quickSearch, Integer page, Integer size) {
        Pageable pageRequest;
        if (page != null && size == -1) {
            pageRequest = Pageable.unpaged();
        } else {
            size = (size != null && size > 0) ? size : 10;
            pageRequest = PageRequest.of(page - 1, size);
        }
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
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String search, List<String> columns) throws IOException {
        Pageable pageable = Pageable.unpaged();
        List<CustomerCategory> customerCategories = null;
        if (Objects.equals(active, "")) {
            customerCategories = customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderByIdDesc(search, pageable).getContent();
        } else {
            customerCategories = customerCategoryRepo.findBySearch(Boolean.valueOf(active), search, pageable).getContent();
        }
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Category info");
        CellStyle cellStyle = ExcelTools.createHeaderCellStyle(workbook);
        ExcelTools.createHeaderRow(sheet, cellStyle, columns);
        generateColumns(customerCategories, sheet, columns);
        ExcelTools.autoSizeColumns(sheet);
        return getResourceResponseEntity(workbook);
    }
    private void generateColumns(List<CustomerCategory> customerCategories, Sheet sheet, List<String> columns) {
        int counter = 1;
        Map<String, Integer> columnIndexMap = ExcelTools.createColumnIndexMap(columns);
        for (CustomerCategory category : customerCategories) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            for (String column : columns) {
                if (!column.equals("Update")){
                    Integer columnIndex = columnIndexMap.get(column);
                    if (columnIndex != null) {
                        Cell cell = dataRow.createCell(columnIndex);
                        switch (column) {
                            case "Title" -> cell.setCellValue(category.getTitle());
                            case "Description" -> cell.setCellValue(category.getDescription());
                            case "Code" -> cell.setCellValue(category.getCode());
                            case "Active" -> cell.setCellValue(category.isActive());
                        }
                    }
                }

            }
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
