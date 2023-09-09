package com.project.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.demo.model.SignupModel;


public interface SignupRepo extends JpaRepository<SignupModel, String>
{

}