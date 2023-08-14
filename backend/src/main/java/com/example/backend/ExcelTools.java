package com.example.backend;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

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
}
