package com.example.backend.Repository;

import com.example.backend.Entity.WeekDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeekDayRepo extends JpaRepository<WeekDay, Integer> {
}
