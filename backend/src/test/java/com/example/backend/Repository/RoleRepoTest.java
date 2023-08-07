package com.example.backend.Repository;

import com.example.backend.Entity.Role;
import com.example.backend.Enums.UserRoles;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class RoleRepoTest {
    @Mock
    private RoleRepo roleRepo;

    @Test
    void itShouldFindAllByName() {
        String roleName = "ROLE_ADMIN";
        Role role1 = new Role(1, UserRoles.ROLE_ADMIN);
        Role role2 = new Role(2, UserRoles.ROLE_USER);
        List<Role> roles = Arrays.asList(role1, role2);

        Mockito.when(roleRepo.findAllByName(roleName)).thenReturn(roles);
        List<Role> allByName = roleRepo.findAllByName(roleName);

        assertEquals(2, allByName.size());
        assertEquals(role1, allByName.get(0));
        assertEquals(role2, allByName.get(1));
        Mockito.verify(roleRepo, Mockito.times(1)).findAllByName(roleName);
    }

    @Test
    void itShouldFindByName() {
        String roleName = "ROLE_ADMIN";
        Role role = new Role(1, UserRoles.ROLE_ADMIN);

        Mockito.when(roleRepo.findByName(UserRoles.ROLE_ADMIN)).thenReturn(role);
        Role byName = roleRepo.findByName(UserRoles.ROLE_ADMIN);

        assertEquals(role, byName);
        Mockito.verify(roleRepo, Mockito.times(1)).findByName(UserRoles.ROLE_ADMIN);
    }
}