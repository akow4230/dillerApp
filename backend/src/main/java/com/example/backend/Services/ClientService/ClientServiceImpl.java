package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.WeekDay;
import com.example.backend.Enums.WeekDays;
import com.example.backend.Projection.CompanyProfileProjection;
import com.example.backend.Repository.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.example.backend.Services.CompanyService.CompanyServiceImpl.autoSizeColumn;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepo clientRepo;
    private final UserRepo userRepo;
    private final TerritoryRepo territoryRepo;
    private final CustomerCategoryRepo categoryRepo;
    private final WeekDayRepo weekDayRepo;


    @Override
    public ResponseEntity<?> getClients(String active, String quickSearch, Integer page, Integer size, String category, String weekDay, String territory, String tin) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        List<Integer> categoryIds = getIdes(category);
        List<Integer> weekDayIds = getIdes(weekDay);
        List<UUID> territoryIds = getUUIDes(territory);

        return ResponseEntity.ok(clientRepo.getClientsByActive(active, quickSearch, categoryIds, weekDayIds, tin, territoryIds, pageRequest));
    }

    @Override
    public HttpEntity<?> getAllClients() {
        return ResponseEntity.ok(clientRepo.findAll());
    }

    @SneakyThrows
    @Override
    public ResponseEntity<Resource> getExcel(HttpServletResponse response, String active, String quickSearch, String category, String weekDay, String territory, String tin) {
        List<Integer> categoryIds = getIdes(category);
        List<UUID> territoryIds = getUUIDes(territory);
        List<Integer> weekDayIds = getIdes(weekDay);
        System.out.println(weekDayIds);
        List<Client> clientList = clientRepo.getClientsByActiveExcel(active, quickSearch, categoryIds, weekDayIds, tin, territoryIds);
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Client");
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        Font headerFont = workbook.createFont();
        headerFont.setFontHeightInPoints((short) 15);
        headerFont.setColor(IndexedColors.WHITE.getIndex());
        cellStyle.setFont(headerFont);
        Row row = sheet.createRow(0);
        row.createCell(0).setCellValue("ID");
        row.createCell(1).setCellValue("Name");
        row.createCell(2).setCellValue("Company");
        row.createCell(3).setCellValue("Territory");
        row.createCell(4).setCellValue("Address");
        row.createCell(5).setCellValue("Phone");
        row.createCell(6).setCellValue("ReferencePoint");
        row.createCell(7).setCellValue("TIN");
        row.createCell(8).setCellValue("Category");
        row.createCell(9).setCellValue("DateOfRegistration");
//        row.createCell(10).setCellValue("Days");
        for (int i = 0; i < 10; i++) {
            row.getCell(i).setCellStyle(cellStyle);
            sheet.autoSizeColumn(i);
        }
        int counter = 1;
        for (Client client : clientList) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            dataRow.createCell(0).setCellValue(client.getId().toString());
            dataRow.createCell(1).setCellValue(client.getName());
            dataRow.createCell(2).setCellValue(client.getCompany());
            dataRow.createCell(3).setCellValue(client.getTerritory().getTitle());
            dataRow.createCell(4).setCellValue(client.getAddress());
            dataRow.createCell(5).setCellValue(client.getPhone());
            dataRow.createCell(6).setCellValue(client.getReferencePoint());
            dataRow.createCell(7).setCellValue(client.getTin());
            dataRow.createCell(8).setCellValue(client.getCategory().getTitle());
            dataRow.createCell(9).setCellValue(client.getDateOfRegistration().toString());

            autoSizeColumn(sheet, dataRow);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Client.xlsx");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(resource);
    }
//    private String getWeekDayName(int dayOfWeek) {
//        String[] days = {"SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"};
//        return days[dayOfWeek];
//    }
    private static List<Integer> getIdes(String word) {
        List<Integer> getIdes = new LinkedList<>();
        if (!word.isEmpty()) {
            String[] strArr = word.split(",");
            for (String s : strArr) {
                getIdes.add(Integer.valueOf(s));
            }
        } else {
            getIdes.add(0);
        }
        return getIdes;
    }

    private static List<UUID> getUUIDes(String word) {
        List<UUID> getIdes = new LinkedList<>();
        if (!word.isEmpty()) {
            String[] strArr = word.split(",");
            for (String s : strArr) {
                getIdes.add(UUID.fromString(s));
            }
        }
        return getIdes;
    }

    @Override
    public HttpEntity<?> addClient(ClientDTO clientDTO) {
        System.out.println(clientDTO.isActive());
        try {
            Client client = Client.builder()
                    .name(clientDTO.getName())
                    .company(clientDTO.getCompanyName())
                    .territory(territoryRepo.findById(clientDTO.getTerritory()).get())
                    .address(clientDTO.getAddress())
                    .phone(clientDTO.getPhone())
                    .referencePoint(clientDTO.getReferencePoint())
                    .tin(clientDTO.getTin())
                    .category(categoryRepo.findById(clientDTO.getCategory()).get())
                    .active(clientDTO.isActive())
                    .dateOfRegistration(LocalDate.now())
                    .weekDay(clientDTO.getWeekdays())
                    .longitude(clientDTO.getLongitude())
                    .latitude(clientDTO.getLatitude())
                    .build();
            clientRepo.save(client);
            return ResponseEntity.ok("Client Saved successfully");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the client");
        }
    }

    @Override
    public void editClient(ClientDTO clientDTO, UUID id) {
        Client currentClient = clientRepo.findById(id).orElseThrow();
        currentClient.setId(id);
        currentClient.setName(clientDTO.getName());
        currentClient.setCompany(clientDTO.getCompanyName());
        currentClient.setTerritory(territoryRepo.findById(clientDTO.getTerritory()).orElseThrow());
        currentClient.setAddress(clientDTO.getAddress());
        currentClient.setPhone(clientDTO.getPhone());
        currentClient.setReferencePoint(clientDTO.getReferencePoint());
        currentClient.setTin(clientDTO.getTin());
        currentClient.setCategory(categoryRepo.findById(clientDTO.getCategory()).orElseThrow());
        currentClient.setWeekDay(clientDTO.getWeekdays());
        currentClient.setLongitude(clientDTO.getLongitude());
        currentClient.setLatitude(clientDTO.getLatitude());
        currentClient.setActive(clientDTO.isActive());
        clientRepo.save(currentClient);
    }
}

