package com.KnowYourNeighborhood.APIAssessment_Module10.Models;

import java.util.List;

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
public class FullDataUsers {

    private UsersDto profile;

    private List<EntityStore> stores;

    private List<String> roles;

}
