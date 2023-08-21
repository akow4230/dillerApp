package com.example.backend.Services.CompanyService;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.User;
import com.example.backend.ExcelTools;
import com.example.backend.Projection.CompanyProfileProjection;
import com.example.backend.Projection.DashboardProjection;
import com.example.backend.Repository.CompanyRepo;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
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
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepo companyRepo;
    @Override
    public HttpEntity<?> getInfo(User user) {
        DashboardProjection dashboardInfo = companyRepo.getDashboardInfo(user.getId());
        return ResponseEntity.ok(dashboardInfo);
    }

    @Override
    public HttpEntity<?> getCompanyProfile(Integer size, Integer page, User user, String quickSearch) {
        Pageable pageable;
        if (page != null && size == -1) {
            pageable = Pageable.unpaged();
        } else {
            size = (size != null && size > 0) ? size : 10;
            pageable = PageRequest.of(page - 1, size);
        }
        Page<CompanyProfileProjection> byCompanyId = companyRepo.findByCompanyId(pageable, quickSearch,user.getId());
        return ResponseEntity.ok(byCompanyId);
    }

    @SneakyThrows
    @Override
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String search, User user, List<String> columns) {
        Pageable pageable=Pageable.unpaged();
        List<CompanyProfileProjection> companyExcel = companyRepo.findByCompanyId(pageable,search,user.getId()).getContent();
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Company info");
        CellStyle cellStyle = ExcelTools.createHeaderCellStyle(workbook);
        ExcelTools.createHeaderRow(sheet, cellStyle,columns);
        populateDataRows(sheet, companyExcel,columns);
        ExcelTools.autoSizeColumns(sheet);
        return getResourceResponseEntity(workbook);
    }


    private void createHeaderRow(Sheet sheet, CellStyle cellStyle) {
        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Region", "Name", "Owner", "SupportPhone", "Email", "Address"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(cellStyle);
            sheet.autoSizeColumn(i);
        }
    }

    private void populateDataRows(Sheet sheet, List<CompanyProfileProjection> companyExcel,List<String> columns) {
        int counter = 1;
        Map<String, Integer> columnIndexMap = ExcelTools.createColumnIndexMap(columns);
        for (CompanyProfileProjection company : companyExcel) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            for (String column : columns) {
                if (!column.equals("Update")){
                    Integer columnIndex = columnIndexMap.get(column);
                    if (columnIndex != null) {
                        Cell cell = dataRow.createCell(columnIndex);
                        switch (column) {
                            case "Name" -> cell.setCellValue(company.getName());
                            case "CompanyName" -> cell.setCellValue(company.getCompanyName());
                            case "Region" -> cell.setCellValue(company.getRegion());
                            case "Phone" -> cell.setCellValue(company.getSupportPhone());
                            case "Email" -> cell.setCellValue(company.getEmail());
                            case "Title" -> cell.setCellValue(company.getTitle());
                        }
                    }
                }

            }
        }
    }
    public static ResponseEntity<Resource> getResourceResponseEntity(XSSFWorkbook workbook) throws IOException {
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

}
