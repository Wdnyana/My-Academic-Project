package com.KnowYourNeighborhood.APIAssessment_Module10.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsersDto {

    private int userId;

    private String name;

    private String email;

    private String imageUrl;

    private String address;

    private String phoneNumber;

    private String provider;

    public UsersDto(EntityUsers user) {
        this.userId = user.getUserId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.imageUrl = user.getImageUrl();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
        this.provider = user.getProvider().toString();
    }

}
