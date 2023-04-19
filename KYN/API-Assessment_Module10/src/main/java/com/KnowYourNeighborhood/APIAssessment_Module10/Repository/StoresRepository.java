package com.KnowYourNeighborhood.APIAssessment_Module10.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.KnowYourNeighborhood.APIAssessment_Module10.BeanEntity.EntityStore;

public interface StoresRepository extends JpaRepository<EntityStore, Integer> {
    @Query(value = "DELETE FROM tb_store WHERE store_id = :store_id", nativeQuery = true)
    void deleteStore(@Param("store_id") int storeId);

    @Query(value = "SELECT * FROM tb_store WHERE "
            + "store_name LIKE '%' :keyword '%' "
            + "OR country LIKE '%' :keyword '%' "
            + "OR city LIKE '%' :keyword '%' ", nativeQuery = true)
    List<EntityStore> searchStore(@Param("keyword") String keyword);
}
