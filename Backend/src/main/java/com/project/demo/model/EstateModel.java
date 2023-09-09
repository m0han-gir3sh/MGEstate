package com.project.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EstateModel{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int estateId;
	private String estateName;
	private String estateUrl;
	private float estateRate;
	private String estateLocation;
	private String availability;
	
	public String isAvailability() {
		return availability;
	}
	public void setAvailability(String availability) {
		this.availability = availability;
	}
	public int getEstateId() {
		return estateId;
	}
	public void setEstateId(int estateId) {
		this.estateId = estateId;
	}
	public String getEstateName() {
		return estateName;
	}
	public void setEstateName(String estateName) {
		this.estateName = estateName;
	}
	public String getEstateUrl() {
		return estateUrl;
	}
	public void setEstateUrl(String estateUrl) {
		this.estateUrl = estateUrl;
	}
	public float getEstateRate() {
		return estateRate;
	}
	public void setEstateRate(float estateRate) {
		this.estateRate = estateRate;
	}
	public String getEstateLocation() {
		return estateLocation;
	}
	public void setEstateLoation(String estateLocation) {
		this.estateLocation = estateLocation;
	}
	
	@Override
	public String toString() {
		return "EstateModel [EstateId=" + estateId + ", estateName=" + estateName + ", estateUrl=" + estateUrl
				+ ", estateRate=" + estateRate + ", estateLocation=" + estateLocation + "]";
	}
	
}