package com.project.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.demo.model.EstateModel;
import com.project.demo.repo.EstateRepo;
//import com.project.demo.repo.EstateRepository;
import com.project.demo.service.EstateService;

@RestController
@RequestMapping(value = "/estate")
@CrossOrigin("*")
public class EstateController {
	@Autowired
	private EstateService estateService;

	@Autowired
	private EstateRepo estateRepo;

	@GetMapping(value = "/getall")
	private ResponseEntity<Object> getEstates() {
		List<EstateModel> estateList = estateService.getEstates();
		return new ResponseEntity<>(estateList, HttpStatus.OK);
	}

	@GetMapping(value = "/getbyid/{estateId}")
	private ResponseEntity<Object> getEstatebyid(@PathVariable int estateId) {
		boolean isEstateExistbyid = estateService.isEstateExistbyid(estateId);
		if (isEstateExistbyid) {
			EstateModel estateModel = estateService.getEstatebyid(estateId);
			return new ResponseEntity<>(estateModel, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("ID not found", HttpStatus.OK);
		}
	}

	@GetMapping(value = "/getbyname/{estateName}")
	private ResponseEntity<Object> getEstatebyname(@PathVariable String estateName) {
		List<EstateModel> estateModel = estateService.getEstatebyname(estateName);
		return new ResponseEntity<>(estateModel, HttpStatus.OK);
	}

	@PostMapping(value = "/add")
	public String createEstate(@RequestBody EstateModel estateModel) {
		boolean isEstateExist = estateService.isEstateExist(estateModel.getEstateName());
		if (isEstateExist)
			return "Estate exists already";
		else {
			estateModel = estateService.createEstate(estateModel);
			return "Estate added";
		}
	}

	@DeleteMapping(value = "/delete")
	public ResponseEntity<Object> deleteEstate(@RequestParam int estateId) {
		estateService.deleteEstate(estateId);
		return new ResponseEntity<>("R.I.P." + "\nCause of Death : EstatePageModel Deletion", HttpStatus.OK);
	}

	@PutMapping(value = "/edit/{estateId}")
	public ResponseEntity<Object> updateEstate(@PathVariable int estateId, @RequestBody EstateModel estateModel) {
		estateModel.setEstateId(estateId);
		estateService.updateEstate(estateModel);
		return new ResponseEntity<>("EstatePageModel details are updated successsfully !", HttpStatus.OK);
	}

	@GetMapping(value = "/{currentPage}/{itemsPerPage}/{sortBy}/{sortOrder}")
	public Page<EstateModel> getData(@PathVariable(value = "currentPage") int page,
			@PathVariable(value = "itemsPerPage") int size, @PathVariable(value = "sortBy") String field,
			@PathVariable(value = "sortOrder") String direction) {
		Pageable paging;
		if (direction.equals("asc")) {
			paging = PageRequest.of(page - 1, size).withSort(Sort.by(field));
		} else {
			paging = PageRequest.of(page - 1, size).withSort(Sort.by(field).descending());
		}
		return estateRepo.findAll(paging);
	}

}