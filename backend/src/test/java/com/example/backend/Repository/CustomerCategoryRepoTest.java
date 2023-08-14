package com.example.backend.Repository;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CustomerCategoryRepoTest {
    @Mock
    private CustomerCategoryRepo customerCategoryRepo;

    @Test
    void itShouldFindAllByTitleContainingIgnoreCaseOrderById() {
        //Given
        String search = "";
        PageRequest pageRequest = PageRequest.of(1, 5);
        Page<CustomerCategory> mockPage = new PageImpl<>(List.of(new CustomerCategory()), pageRequest, 2);
        Mockito.when(customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderById(search, pageRequest)).thenReturn(mockPage);
        //When
        Page<CustomerCategory> customerCategories = customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderById(search, pageRequest);
        //Then
        assertEquals(mockPage, customerCategories);
    }

    @Test
    void itShouldTestFindAllByTitleContainingIgnoreCaseOrderById() {
        //Given
        CustomerCategory customerCategory = new CustomerCategory(1, "title", "code", "desc", true);
        String search = "";
        Mockito.when(customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderById(search)).thenReturn(List.of(customerCategory));
        //When
        List<CustomerCategory> customerCategories = customerCategoryRepo.findAllByTitleContainingIgnoreCaseOrderById(search);
        //Then
        assertEquals(List.of(customerCategory), customerCategories);
    }

    @Test
    void itShouldFindBySearch() {
        //Given
        Boolean active = true;
        String search = "";
        PageRequest pageRequest = PageRequest.of(1, 5);
        Page<CustomerCategory> mockPage = new PageImpl<>(List.of(new CustomerCategory()), pageRequest, 2);
        //When
        Mockito.when(customerCategoryRepo.findBySearch(active, search, pageRequest)).thenReturn(mockPage);
        Page<CustomerCategory> bySearch = customerCategoryRepo.findBySearch(active, search, pageRequest);
        //Then
        assertEquals(bySearch, mockPage);
    }

    @Test
    void itShouldFindAllByActiveAndTitleContaining() {
        //Given
        String search = "";
        Boolean active = true;
        List<CustomerCategory> mockCategories  = List.of(new CustomerCategory(1, "t", "code", "desc", active));
        //When

        Mockito.when(customerCategoryRepo.findAllByActiveAndTitleContaining(active,search)).thenReturn(mockCategories);
        List<CustomerCategory> categories = customerCategoryRepo.findAllByActiveAndTitleContaining(active, search);
        //Then
        assertEquals(mockCategories, categories);
    }
}