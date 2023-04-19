package com.KnowYourNeighborhood.APIAssessment_Module10.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityStore;

import com.KnowYourNeighborhood.APIAssessment_Module10.Models.StoresDto;

import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.UsersRepository;
import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.StoresRepository;

@Service
public class StoreServiceImplementation implements StoreService {

    @Autowired
    private StoresRepository storeRepo;

    @Autowired
    private UsersRepository userRepo;

    @Override
    public List<EntityStore> listStore() {

        List<EntityStore> listStore = storeRepo.findAll();

        return listStore;
    }

    @Override
    public EntityStore getStoreById(int storeId) {

        return storeRepo.findById(storeId).get();
    }

    @Override
    public StoresDto addStore(StoresDto storeDto) {
        EntityUsers user = userRepo.findById(storeDto.getUser().getUserId()).get();

        EntityStore store = new EntityStore(storeDto, user);

        storeRepo.save(store);

        StoresDto DTO = new StoresDto(store);

        return DTO;

    }

    @Override
    public EntityStore editStore(StoresDto storeDto) {
        EntityStore store = storeRepo.findById(storeDto.getStoreId()).get();

        store.setStoreName(storeDto.getStoreName());
        store.setCountry(storeDto.getCountry());
        store.setCity(storeDto.getCity());
        store.setStoreEmail(storeDto.getStoreEmail());
        store.setPhoneNumber(storeDto.getPhoneNumber());
        store.setImageUrl(storeDto.getImageUrl());
        store.setDescription(storeDto.getDescription());

        return storeRepo.save(store);
    }

    @Override
    public List<EntityStore> searchStore(String keyword) {

        List<EntityStore> listStore = storeRepo.searchStore(keyword);

        return listStore;
    }

}
