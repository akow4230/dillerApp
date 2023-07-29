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

    @BeforeEach
    void setUp() {
        User save = userRepo.save(new User("+9989051089066", "123", null));
        company = underTest.save(new Company(
                1,
                "BUXORO",
                "SHIFTACADEMY",
                save,
                "123",
                "123",
                "BUXORO"
        ));

    }

    @Test
    void itShouldGetDashboardInfo() {
        DashboardProjection dashboardProjection = underTest.getDashboardInfo().get(0);
        System.out.println(underTest.getDashboardInfo());
        Assertions.assertEquals(company.getSupportPhone(), dashboardProjection.getSupportPhone());
    }
}