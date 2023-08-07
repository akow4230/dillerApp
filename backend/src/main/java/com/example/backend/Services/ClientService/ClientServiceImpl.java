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


    private Page<Client> getClientFilter(String active, String search, PageRequest pageRequest, List<Integer> categoryIds, List<Integer> weekDayIds) {
        Page<Client> allClient = null;

        if (Objects.equals(active, "")) {
            allClient = clientRepo.findAllByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(search, categoryIds,weekDayIds, pageRequest);
            return allClient;
        }
        boolean aBoolean = Boolean.parseBoolean(active);
        allClient = clientRepo.findAllByActiveAndNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrPhoneContainingIgnoreCase(aBoolean, search, categoryIds, weekDayIds, pageRequest );
        return allClient;
    }


    @Override
    public HttpEntity<?> getClients(String active, String quickSearch, Integer page, Integer size, String category, String weekDay) {
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        List<Integer> categoryIds = getIdes(category);
        List<Integer> weekDayIds= getIdes(weekDay);
        return ResponseEntity.ok(getClientFilter(active, quickSearch, pageRequest, categoryIds, weekDayIds));
    }

    private static List<Integer> getIdes(String word) {
        List<Integer> getIdes=new LinkedList<>();
        if(!word.equals("")) {
            String[] strArr = word.split(",");
            for (String s : strArr) {
                getIdes.add(Integer.valueOf(s));
            }
       } else{
            getIdes.add(0);
        }
        return getIdes;
    }

}

