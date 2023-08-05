package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

public interface DashboardProjection {
    @Value("#{target.support_phone}")
    String getSupportPhone();
    @Value("#{target.date_now}")
    String getCurrentDateAndTime();
}
