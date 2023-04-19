package com.KnowYourNeighborhood.APIAssessment_Module10.Services;

import java.util.List;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityStore;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.StoresDto;

public interface StoreService {

    List<EntityStore> listStore();

    EntityStore getStoreById(int storeId);

    StoresDto addStore(StoresDto storeDto);

    EntityStore editStore(StoresDto storeDto);

    List<EntityStore> searchStore(String keyword);

}
