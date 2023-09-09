package com.project.demo.controller;							

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.demo.model.SignupModel;
import com.project.demo.service.SignupService;

@RestController
@RequestMapping(value="/signup")
@CrossOrigin("*")
public class SignupController {
	@Autowired
	private SignupService signupService;
	
	@PostMapping(value = "/create")
	public String createAccount(@RequestBody SignupModel signupModel)
	{
		signupModel = signupService.createAccount(signupModel);
		return "Login Successfull";
	}
	
}