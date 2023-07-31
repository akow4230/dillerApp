package com.example.backend.Config;
import com.example.backend.Entity.Company;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.Test;
import com.example.backend.Entity.User;
import com.example.backend.Enums.UserRoles;
import com.example.backend.Repository.CompanyRepo;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.TestRepo;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class AutoRun implements CommandLineRunner {

    private final CompanyRepo companyRepo;
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final TestRepo testRepo;

    @Override
    public void run(String... args) throws Exception {
        String adminPhone="+998999999999";
        List<Role> savedRoles=saveRoles();
        System.out.println(savedRoles);
        Optional<User> userByPhone = userRepo.findByPhone(adminPhone);
        saveUser(adminPhone, userByPhone, savedRoles);
        RestTemplate restTemplate = new RestTemplate();
        Test[] forObject = restTemplate.getForObject("https://jsonplaceholder.typicode.com/photos", Test[].class);
        testRepo.saveAll(Arrays.asList(forObject));
    }


    private void saveUser(String adminPhone, Optional<User> userByPhone, List<Role> savedRoles) {
        if(userByPhone.isEmpty()) {
            User user = User.builder()
                    .phone(adminPhone)
                    .password(passwordEncoder.encode("00000000"))
                    .roles(List.of(roleRepo.findByName(UserRoles.ROLE_SUPER_ADMIN)))
                    .build();
            userRepo.save(user);
            Company company = Company.builder()
                    .region("Bukhara")
                    .name("Shift Academy")
                    .owner(user)
                    .supportPhone("+9998901234567")
                    .email("example@gmail.com")
                    .territory(new ArrayList<>())
                    .build();

            companyRepo.save(company);
        }
    }

    private List<Role> saveRoles() {
        return roleRepo.saveAll(new ArrayList<>(List.of(
                    new Role(1,UserRoles.ROLE_ADMIN),
                    new Role(2,UserRoles.ROLE_USER),
                    new Role(3,UserRoles.ROLE_SUPER_ADMIN))));
    }

}
