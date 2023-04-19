package com.KnowYourNeighborhood.APIAssessment_Module10.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityRoles;
import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.ERole;

public interface RolesRepository extends JpaRepository<EntityRoles, Long> {

    EntityRoles findByName(ERole roleName);

}
