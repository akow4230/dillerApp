package com.example.backend.Services.WeekService;

import com.example.backend.Repository.CustomerCategoryRepo;
import com.example.backend.Repository.WeekDayRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WeekDayServiceImpl implements WeekDayService {
    private final WeekDayRepo weekDayRepo;

    @Override
    public HttpEntity<?> getWeekDays() {
       return ResponseEntity.ok(weekDayRepo.findAll());
    }
}
