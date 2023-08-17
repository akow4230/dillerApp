package com.example.backend;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExcelTools {
    public static void autoSizeColumns(Sheet sheet) {
        int numberOfColumns = sheet.getRow(0).getPhysicalNumberOfCells();

        for (int i = 0; i < numberOfColumns; i++) {
            sheet.autoSizeColumn(i);
        }
    }
    public static CellStyle createHeaderCellStyle(XSSFWorkbook workbook) {
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
        cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        Font headerFont = workbook.createFont();
        headerFont.setFontHeightInPoints((short) 15);
        headerFont.setColor(IndexedColors.WHITE.getIndex());

        cellStyle.setFont(headerFont);
        return cellStyle;
    }

    public static Map<String, Integer> createColumnIndexMap(List<String> columns) {
        Map<String, Integer> columnIndexMap = new HashMap<>();
        int columnIndex = 0;
        for (String column : columns) {
            columnIndexMap.put(column, columnIndex);
            columnIndex++;
        }
        return columnIndexMap;
    }

    public static void createHeaderRow(Sheet sheet, CellStyle cellStyle, List<String> columns) {
        Row headerRow = sheet.createRow(0);
        int columnIndex = 0;
        for (String column : columns) {
            if (!column.equals("Update")) {
                Cell cell = headerRow.createCell(columnIndex);
                cell.setCellValue(column);
                cell.setCellStyle(cellStyle);
                columnIndex++;
            }
        }
    }
}
