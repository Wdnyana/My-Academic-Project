package com.KnowYourNeighborhood.APIAssessment_Module10.Services;

import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityRoles;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.ERole;

import com.KnowYourNeighborhood.APIAssessment_Module10.Models.ProfileEditDto;
import com.KnowYourNeighborhood.APIAssessment_Module10.Models.UsersDto;

import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.RolesRepository;
import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.UsersRepository;

@Service
public class UsersServiceImplementation implements UsersService {

    @Autowired
    private UsersRepository userRepo;

    @Autowired
    private RolesRepository rolesRepo;

    @Override
    public EntityRoles createRole(ERole roleName) {
        EntityRoles role = new EntityRoles();
        role.setName(roleName);
        return rolesRepo.save(role);
    }

    @Override
    public EntityUsers findByEmail(String email) {
        return userRepo.findByEmail(email).get();
    }

    @Override
    public EntityUsers getById(int userId) {
        EntityUsers user = userRepo.findById(userId).get();

        return user;
    }

    @Override
    public EntityUsers editProfile(ProfileEditDto editProfileDto) {
        EntityUsers user = getById(editProfileDto.getUserId());

        user.setName(editProfileDto.getName());
        user.setAddress(editProfileDto.getAddress());
        user.setPhoneNumber(editProfileDto.getPhoneNumber());

        return userRepo.save(user);
    }

    @Override
    public List<UsersDto> listUser() {
        ModelMapper modelMapper = new ModelMapper();

        List<EntityUsers> users = userRepo.findAll();
        List<UsersDto> listUser = Arrays.asList(modelMapper.map(users, UsersDto[].class));
        return listUser;
    }

}
