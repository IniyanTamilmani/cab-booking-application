package com.model;

public class Fare {
	private int fareId;
	private int companyId;
	private int cabTypeId;
	private double farePerKm;
	private int createdAt;
	private int modifiedAt;
	
	public int getFareId() {
		return fareId;
	}
	public void setFareId(int fareId) {
		this.fareId = fareId;
	}
	public int getCompanyId() {
		return companyId;
	}
	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}
	public int getCabTypeId() {
		return cabTypeId;
	}
	public void setCabTypeId(int cabTypeId) {
		this.cabTypeId = cabTypeId;
	}
	public double getFarePerKm() {
		return farePerKm;
	}
	public void setFarePerKm(double farePerKm) {
		this.farePerKm = farePerKm;
	}
	public int getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(int createdAt) {
		this.createdAt = createdAt;
	}
	public int getModifiedAt() {
		return modifiedAt;
	}
	public void setModifiedAt(int modifiedAt) {
		this.modifiedAt = modifiedAt;
	}
	
}
