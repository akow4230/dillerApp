package com.example.backend.Config;

import com.example.backend.Entity.*;
import com.example.backend.Enums.UserRoles;
import com.example.backend.Enums.WeekDays;
import com.example.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class AutoRun implements CommandLineRunner {
    private final WeekDayRepo weekDayRepo;
    private final CompanyRepo companyRepo;
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final TerritoryRepo territoryRepo;
    private final SettingsRepo settingsRepo;

    @Override
    public void run(String... args) throws Exception {
        String adminPhone = "+998999999999";
        List<Role> savedRoles = saveRoles();
        Optional<User> userByPhone = userRepo.findByPhone(adminPhone);
        saveUser(adminPhone, userByPhone);

        List<Settings> all = settingsRepo.findAll();
        saveSettings(all);
        List<WeekDay> allWeekDays = new ArrayList<>();
        if (weekDayRepo.count() == 0) {
            List<WeekDays> weekDaysList = Arrays.asList(WeekDays.values());
            weekDaysList.forEach(weekDay -> allWeekDays.add(new WeekDay(weekDay)));
        }
        weekDayRepo.saveAll(allWeekDays);
    }

    private void saveSettings(List<Settings> all) {
        if (all.isEmpty()) {
            Settings companyProfile = new Settings(1, "Company Profile", "/dashboard/settings/company-profile");
            Settings territory = new Settings(2, "Territory", "/dashboard/settings/territory");
            Settings customerCategory = new Settings(3, "Customer Category", "/dashboard/settings/customer-category");
            settingsRepo.saveAll(List.of(companyProfile, territory, customerCategory));
        }
    }


    private void saveUser(String adminPhone, Optional<User> userByPhone) {
        if (userByPhone.isEmpty()) {
            User user = User.builder()
                    .phone(adminPhone)
                    .password(passwordEncoder.encode("00000000"))
                    .roles(List.of(roleRepo.findByName(UserRoles.ROLE_SUPER_ADMIN)))
                    .build();
            userRepo.save(user);
            Territory territory = Territory.builder()
                    .title("Shift Academy")
                    .region("Bukhara")
                    .createdAt(LocalDateTime.now())
                    .code("T0001")
                    .build();
            Territory savedTerritory = territoryRepo.save(territory);
            Company company = Company.builder()
                    .region("Bukhara")
                    .name("Shift Academy")
                    .owner(user)
                    .supportPhone("+9998901234567")
                    .email("example@gmail.com")
                    .territory(List.of(savedTerritory))
                    .build();
            companyRepo.save(company);
        }
    }

    private List<Role> saveRoles() {
        return roleRepo.saveAll(new ArrayList<>(List.of(
                new Role(1, UserRoles.ROLE_ADMIN),
                new Role(2, UserRoles.ROLE_USER),
                new Role(3, UserRoles.ROLE_SUPER_ADMIN))));
    }

}
