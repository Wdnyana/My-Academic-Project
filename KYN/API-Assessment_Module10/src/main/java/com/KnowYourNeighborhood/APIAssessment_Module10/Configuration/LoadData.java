package com.KnowYourNeighborhood.APIAssessment_Module10.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityRoles;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.ERole;

import com.KnowYourNeighborhood.APIAssessment_Module10.Repository.RolesRepository;

@Component
public class LoadData implements ApplicationRunner {

    @Autowired
    private RolesRepository rolesRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (rolesRepo.findByName(ERole.ROLE_USER) == null) {
            rolesRepo.save(new EntityRoles(ERole.ROLE_USER));
        }

        if (rolesRepo.findByName(ERole.ROLE_ADMIN) == null) {
            rolesRepo.save(new EntityRoles(ERole.ROLE_ADMIN));
        }
    }

}
