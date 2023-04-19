package com.KnowYourNeighborhood.APIAssessment_Module10.Models;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityStore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StoresDto {

    private int storeId;

    private String storeName;

    private String country;

    private String city;

    private String storeEmail;

    private String phoneNumber;

    private String imageUrl;

    private String description;

    private UsersDto user;

    public StoresDto(EntityStore store) {
        this.storeId = store.getStoreId();
        this.storeName = store.getStoreName();
        this.country = store.getCountry();
        this.city = store.getCity();
        this.storeEmail = store.getStoreEmail();
        this.phoneNumber = store.getPhoneNumber();
        this.imageUrl = store.getImageUrl();
        this.description = store.getDescription();
        this.user = new UsersDto(store.getUser());
    }

}
