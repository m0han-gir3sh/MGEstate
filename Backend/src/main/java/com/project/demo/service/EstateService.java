package com.project.demo.service;

import java.util.List;

import com.project.demo.model.EstateModel;

public interface EstateService{

	public abstract List<EstateModel> getEstates();

	public abstract EstateModel createEstate(EstateModel estateModel);

	public abstract void updateEstate(EstateModel estateModel);

	public abstract void deleteEstate(Integer estateId);

	public abstract boolean isEstateExist(String estateName);

	public abstract boolean isEstateExistbyid(int estateId);

    public abstract EstateModel getEstatebyid(int estateId);

    public abstract List<EstateModel> getEstatebyname(String estateName);
	
}