package com.example.backend.Services.ClientService;

import com.example.backend.Entity.Client;
import com.example.backend.Repository.ClientRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepo clientRepo;


    private Page<Client> getClientFilter(String active, String search, PageRequest pageRequest, List<Integer> categoryIds) {
        Page<Client> allClient = null;
        System.out.println(categoryIds);
        if (Objects.equals(active, "")) {
            System.out.println("first if");
            allClient = clientRepo.findAllByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(search, categoryIds, pageRequest);
            return allClient;
        }
        boolean aBoolean = Boolean.parseBoolean(active);
        allClient = clientRepo.findAllByActiveAndNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(aBoolean, search, categoryIds, pageRequest );
        System.out.println(allClient);
        return allClient;
    }


    @Override
    public HttpEntity<?> getClients(String active, String quickSearch, Integer page, Integer size, String category) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        System.out.println(category);

        List<Integer> categoryIds=new LinkedList<>();
        if(!category.equals("")) {
            String[] strArr = category.split(",");
            for (String s : strArr) {
                categoryIds.add(Integer.valueOf(s));
            }
        }else{
            categoryIds.add(0);
        }
        return ResponseEntity.ok(getClientFilter(active, quickSearch, pageRequest, categoryIds));
    }
}
