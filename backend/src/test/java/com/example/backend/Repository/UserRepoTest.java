package com.example.backend.Repository;

import com.example.backend.Entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepoTest {
    @Mock
    private UserRepo userRepo;

    @Test
    void itShouldFindByPhone() {
        //Given
        User user = new User();
        user.setPhone("123");
        //When
        Mockito.when(userRepo.findByPhone(user.getPhone())).thenReturn(Optional.of(user));
        Optional<User> byPhone = userRepo.findByPhone(user.getPhone());
        //Then
        Assertions.assertEquals(byPhone, Optional.of(user));
    }
}