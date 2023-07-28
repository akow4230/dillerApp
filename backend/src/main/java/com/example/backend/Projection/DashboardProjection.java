package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;

public interface DashboardProjection {
    @Value("#{target.support_phone}")
    String getSupportPhone();
    @Value("#{target.current_date_and_time}")
    Instant getCurrentDateAndTime();
}
