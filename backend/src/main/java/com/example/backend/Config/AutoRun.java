package com.example.backend.Config;
import com.example.backend.Entity.Company;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Enums.UserRoles;
import com.example.backend.Repository.CompanyRepo;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class AutoRun implements CommandLineRunner {

    private final CompanyRepo companyRepo;
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminPhone="123";
        List<Role> allRoles = roleRepo.findAll();
        Optional<User> userByPhone = userRepo.findByPhone(adminPhone);
        List<Role> savedRoles=new ArrayList<>();
        savedRoles = saveRoles(allRoles, savedRoles);
        saveUser(adminPhone, userByPhone, savedRoles);
    }


    private void saveUser(String adminPhone, Optional<User> userByPhone, List<Role> savedRoles) {
        if(userByPhone.isEmpty()) {
            User user = User.builder()
                    .phone(adminPhone)
                    .password(passwordEncoder.encode("00000000"))
                    .roles(savedRoles)
                    .build();

            userRepo.save(user);
            Company company = Company.builder()
                    .region("Bukhara")
                    .company_name("Shift Academy")
                    .user(user)
                    .support_phone("+9998901234567")
                    .email("example@gmail.com")
                    .address("Dunyo binosi")
                    .build();

            companyRepo.save(company);
        }
    }

    private List<Role> saveRoles(List<Role> allRoles, List<Role> savedRoles) {
        if(allRoles.size()==0) {
            List<Role> tempRoles = new ArrayList<>(List.of(
                    new Role(1, UserRoles.ROLE_ADMIN),
                    new Role(1, UserRoles.ROLE_USER),
                    new Role(1, UserRoles.ROLE_SUPER_ADMIN)
            ));
           savedRoles = roleRepo.saveAll(tempRoles);
        }
        return savedRoles;
    }
}
