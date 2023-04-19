package com.KnowYourNeighborhood.APIAssessment_Module10.Services;

import java.util.List;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityRoles;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.ERole;

import com.KnowYourNeighborhood.APIAssessment_Module10.Models.ProfileEditDto;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.UsersDto;

public interface UsersService {

    EntityRoles createRole(ERole roleName);

    EntityUsers findByEmail(String email);

    List<UsersDto> listUser();

    EntityUsers getById(int userId);

    EntityUsers editProfile(ProfileEditDto editProfileDto);

}
