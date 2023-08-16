package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.ExcelTools;
import com.example.backend.Projection.CompanyProfileProjection;
import com.example.backend.Repository.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.glassfish.grizzly.http.util.TimeStamp;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import static com.example.backend.Services.CompanyService.CompanyServiceImpl.*;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepo clientRepo;
    private final UserRepo userRepo;
    private final TerritoryRepo territoryRepo;
    private final CustomerCategoryRepo categoryRepo;


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
        List<Client> clientList = clientRepo.getClientsByActiveExcel(active, quickSearch, categoryIds, weekDayIds, tin, territoryIds);
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Client");
        CellStyle cellStyle = ExcelTools.createHeaderCellStyle(workbook);
        createHeaderRow(sheet, cellStyle);
        generateColumns(clientList, sheet);
        ExcelTools.autoSizeColumns(sheet);
        return getResourceResponseEntity(workbook);
    }

    private static void generateColumns(List<Client> clientList, Sheet sheet) {
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
        }
    }

    private void createHeaderRow(Sheet sheet, CellStyle cellStyle) {
        Row headerRow = sheet.createRow(0);
        String[] headers = {
                "ID", "Name", "Company", "Territory", "Address",
                "Phone", "ReferencePoint",
                "TIN", "Category", "DateOfRegistration"
        };
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(cellStyle);
            sheet.autoSizeColumn(i);
        }
    }

    @Override
    public HttpEntity<?> addClient(ClientDTO clientDTO) {
        try {
            ZoneId gmt5Zone = ZoneId.of("GMT+5");
            ZonedDateTime currentDateTime = ZonedDateTime.now(gmt5Zone);

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
                    .dateOfRegistration(currentDateTime.toLocalDateTime())
                    .weekDay(clientDTO.getWeekdays())
                    .longitude(clientDTO.getLongitude())
                    .latitude(clientDTO.getLatitude())
                    .build();

            clientRepo.save(client);
            return ResponseEntity.ok("Client saved successfully");
        } catch (Exception e) {
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
}

