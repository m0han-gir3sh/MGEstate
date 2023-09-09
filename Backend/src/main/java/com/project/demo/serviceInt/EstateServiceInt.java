package com.project.demo.serviceInt;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.project.demo.model.EstateModel;
import com.project.demo.repo.EstateRepo;
import com.project.demo.service.EstateService;

@Service
public class EstateServiceInt implements EstateService{
	
	@Autowired
	private EstateRepo estateRepo;

	@Override
	public List<EstateModel> getEstates() {
		return (List<EstateModel>)estateRepo.findAll();
	}

	@Override
	public EstateModel createEstate(EstateModel estateModel) {
		return estateRepo.save(estateModel);
	}

	@Override
	public void deleteEstate(Integer estateId) {
		estateRepo.deleteById(estateId);
	}

	@Override
	public void updateEstate(EstateModel estateModel) {
		estateRepo.save(estateModel);
	}

	@Override
	public boolean isEstateExist(String estateName) {
		return estateRepo.existsByEstateNameIgnoreCase(estateName);
	}

	@Override
	public boolean isEstateExistbyid(int estateId) {
		return estateRepo.existsById(estateId);
	}

	@Override
	public EstateModel getEstatebyid(int estateId) {
		Optional<EstateModel> optional = estateRepo.findById(estateId);
		EstateModel estateModel = optional.get();
		return estateModel;
	}
	
	
	
	@Autowired
	EstateRepo estateRepository;
    public Page<EstateModel> SortingAndPaging(int page,int size,String field){
        Pageable paging=PageRequest.of(page, size).withSort(Sort.by(field));
        return estateRepo.findAll(paging);
    }
    public Page<EstateModel> Paging(int CurrentPage,int itemsPerPage){
        Pageable paging=PageRequest.of(CurrentPage,itemsPerPage);
        return estateRepo.findAll(paging);
    }

	@Override
	public List<EstateModel> getEstatebyname(String estateName) {
		return (List<EstateModel>)estateRepo.findByEstateNameContainingIgnoreCase(estateName);
	}
} 	 	
