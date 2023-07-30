package com.example.backend.Repository;

import com.example.backend.Entity.Company;
import com.example.backend.Entity.User;
import com.example.backend.Projection.DashboardProjection;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CompanyRepoTest {
    @Autowired
    private CompanyRepo underTest;
    @Autowired
    private UserRepo userRepo;
    private Company company;
    private User user;

    @BeforeEach
    void setUp() {
        user = userRepo.save(new User("+9989051089066", "123", null));
        company = underTest.save(new Company(
                1,
                "BUXORO",
                "SHIFTACADEMY",
                user,
                "+9998901234567",
                "123",
                null
        ));

    }

    @Test
    void itShouldGetDashboardInfo() {
        DashboardProjection dashboardProjection = underTest.getDashboardInfo(user.getId());
        System.out.println(underTest.getDashboardInfo(user.getId()));
        Assertions.assertEquals(company.getSupportPhone(), dashboardProjection.getSupportPhone());
    }
}