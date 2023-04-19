package com.KnowYourNeighborhood.APIAssessment_Module10.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityUsers;

public interface UsersRepository extends JpaRepository<EntityUsers, Integer> {

    public Optional<EntityUsers> findByEmail(String email);

    Boolean existsByEmail(String email);

}
