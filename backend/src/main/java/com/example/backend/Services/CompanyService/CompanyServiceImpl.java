package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.Company;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.User;
import com.example.backend.Projection.CompanyProfileProjection;
import com.example.backend.Projection.DashboardProjection;
import com.example.backend.Repository.CompanyRepo;
import com.example.backend.Services.AuthService.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
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

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepo companyRepo;
    private final AuthService authService;

    @Override
    public HttpEntity<?> getInfo(User user) {
        DashboardProjection dashboardInfo = companyRepo.getDashboardInfo(user.getId());
        System.out.println(dashboardInfo);
        return ResponseEntity.ok(dashboardInfo);
    }

    @Override
    public HttpEntity<?> getCompanyProfile(Integer size, Integer page, User user, String quickSearch) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<CompanyProfileProjection> byCompanyId = companyRepo.findByCompanyId(pageRequest, quickSearch);
        return ResponseEntity.ok(byCompanyId);
    }

    @SneakyThrows
    @Override
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String search) {
        List<CompanyProfileProjection> companyExcel = companyRepo.findByCompanyIdExcel(search);
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
        row.createCell(1).setCellValue("Region");
        row.createCell(2).setCellValue("Name");
        row.createCell(3).setCellValue("Owner");
        row.createCell(4).setCellValue("SupportPhone");
        row.createCell(5).setCellValue("Email");
        row.createCell(6).setCellValue("Address");
        for (int i = 0; i < 7; i++) {
            row.getCell(i).setCellStyle(cellStyle);
            sheet.autoSizeColumn(i);
        }
        int counter = 1;
        for (CompanyProfileProjection company1 : companyExcel) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            dataRow.createCell(0).setCellValue(company1.getId().toString());
            dataRow.createCell(1).setCellValue(company1.getRegion());
            dataRow.createCell(2).setCellValue(company1.getName());
            dataRow.createCell(3).setCellValue(company1.getSupportPhone());
            dataRow.createCell(4).setCellValue(company1.getSupportPhone());
            dataRow.createCell(5).setCellValue(company1.getEmail());
            dataRow.createCell(6).setCellValue(company1.getTitle());
            autoSizeColumn(sheet, dataRow);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=CompanyProfileInfo.xlsx");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(resource);
    }

    public static void autoSizeColumn(Sheet sheet, Row dataRow) {
        for (int i = 0; i < 7; i++) {
            Cell cell = dataRow.getCell(i);
            String cellContent = "";

            if (cell != null) {
                switch (cell.getCellType()) {
                    case STRING:
                        cellContent = cell.getStringCellValue();
                        break;
                    case NUMERIC:
                        cellContent = String.valueOf(cell.getNumericCellValue());
                        break;
                    case BOOLEAN:
                        cellContent = String.valueOf(cell.getBooleanCellValue());
                        break;
                }
            }
            int contentLength = cellContent.length();
            int currentWidth = sheet.getColumnWidth(i);
            if (contentLength * 256 > currentWidth) {
                sheet.setColumnWidth(i, contentLength * 256);
            }
        }
    }


}
