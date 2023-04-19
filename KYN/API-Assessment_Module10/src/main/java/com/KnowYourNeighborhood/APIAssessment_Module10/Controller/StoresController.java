package com.KnowYourNeighborhood.APIAssessment_Module10.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityStore;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.StoresDto;
import com.KnowYourNeighborhood.APIAssessment_Module10.Services.StoreService;

@RestController
@RequestMapping("/store/stores")
public class StoresController {

    @Autowired
    private StoreService storeService;

    @GetMapping("")
    public List<EntityStore> listStore() {

        return storeService.listStore();
    }

    @PostMapping("/add")
    public StoresDto addStore(@RequestBody StoresDto storeDto) {

        StoresDto newStore = storeService.addStore(storeDto);

        return newStore;
    }

    @GetMapping("/{storeId}")
    public StoresDto getStoreById(@PathVariable("storeId") int storeId) {
        EntityStore store = storeService.getStoreById(storeId);

        return new StoresDto(store);
    }

    @PutMapping("/edit")
    public StoresDto editStore(@RequestBody StoresDto storeDto) {
        EntityStore store = storeService.editStore(storeDto);

        return new StoresDto(store);
    }

    @GetMapping(value = "", params = "keyword")
    public List<EntityStore> searchStore(@RequestParam("keyword") String keyword) {

        return storeService.searchStore(keyword);
    }

}
