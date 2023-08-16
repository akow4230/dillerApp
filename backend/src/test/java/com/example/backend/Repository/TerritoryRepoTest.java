//package com.example.backend.Repository;
//
//import com.example.backend.Entity.Territory;
//
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.when;
//
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//class TerritoryRepoTest {
//    @Mock
//    private TerritoryRepo territoryRepo;
//
//    @Test
//    void itShouldFindAllByActiveAndTitleContainingIgnoreCaseOrRegionContainingIgnoreCase() {
//        Territory territory = new Territory(
//                null, "1reg", "1title", "1code", true, 1.1, 1.2
//        );
//        Territory territory2 = new Territory(
//                null, "2reg", "2title", "2code", true, 1.1, 1.2
//        );
//        boolean active = true;
//        String search = "tit";
//        when(territoryRepo.findAllByActiveAndRegionAndTitle(active, search)).thenReturn(List.of(territory2, territory));
//
//        List<Territory> territoryPage = territoryRepo.findAllByActiveAndRegionAndTitle(active, search);
//        assertEquals(List.of(territory2, territory), territoryPage);
//
//    }
//
//    @Test
//    void itShouldFindAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCase() {
//        Territory territory = new Territory(
//                null, "1reg", "1title", "1code", true, 1.1, 1.2
//        );
//        Territory territory2 = new Territory(
//                null, "2reg", "2title", "2code", true, 1.1, 1.2
//        );
//        String title = "tit";
//        String region = "reg";
//        String code = "code";
//        PageRequest pageable = PageRequest.of(1, 5);
//        Page<Territory> mockPage = new PageImpl<>(Arrays.asList(territory, territory2), pageable, 2);
//
//        when(territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrCodeContainingIgnoreCase(title, region, code, pageable)).thenReturn(mockPage);
//
//        Page<Territory> territoryPage = territoryRepo.findAllByTitleContainingIgnoreCaseOrRegionContainingIgnoreCaseOrCodeContainingIgnoreCase(title, region, code, pageable);
//        assertEquals(mockPage, territoryPage);
//    }
//}