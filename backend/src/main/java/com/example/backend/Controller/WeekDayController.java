package com.example.backend.Controller;

import com.example.backend.Repository.WeekDayRepo;
import com.example.backend.Services.CustomerCategoryService.CustomerCategoryService;
import com.example.backend.Services.WeekService.WeekDayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/weekday")
@RequiredArgsConstructor
public class WeekDayController {
    private final WeekDayService weekDayService;
    @GetMapping
    public HttpEntity<?> getWeekDays(){
        System.out.println("get");
        return weekDayService.getWeekDays();
    }

}
