package com.example.backend.Repository;

import com.example.backend.Entity.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepo extends JpaRepository<Settings, Integer> {

}
