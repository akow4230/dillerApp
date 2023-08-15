package com.example.backend.Services.CompanyService;
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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

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
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<CompanyProfileProjection> byCompanyId = companyRepo.findByCompanyId(pageRequest, quickSearch);
        return ResponseEntity.ok(byCompanyId);
    }

    @SneakyThrows
    @Override
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String search) {
        List<CompanyProfileProjection> companyExcel = companyRepo.findByCompanyIdExcel(search);
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Company info");
        CellStyle cellStyle = ExcelTools.createHeaderCellStyle(workbook);
        createHeaderRow(sheet, cellStyle);
        populateDataRows(sheet, companyExcel);
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

    private void populateDataRows(Sheet sheet, List<CompanyProfileProjection> companyExcel) {
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
