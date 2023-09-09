package com.project.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.project.demo.model.EstateModel;

import java.util.List;

public interface EstateRepo extends JpaRepository<EstateModel, Integer>
{

	boolean existsByEstateNameIgnoreCase(String estateName);

    List<EstateModel> findByEstateNameContainingIgnoreCase(String estateName);
	
}