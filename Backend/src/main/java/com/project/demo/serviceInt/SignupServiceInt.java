package com.project.demo.serviceInt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.demo.model.SignupModel;
import com.project.demo.repo.SignupRepo;
import com.project.demo.service.SignupService;

@Service
public class SignupServiceInt implements SignupService
{

	@Autowired
	private SignupRepo signupRepo;

	@Override
	public SignupModel createAccount(SignupModel signupModel) {
		return signupRepo.save(signupModel);
	}
}