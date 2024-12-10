package com.model;

public class Driver {
	private int driverDetailId;
	private int driverId;
	private int licenseNumber;
	private int status;
	private int reportCount;
	private int companyID;
	private int createdAt;
	private int modifiedAt;
	public int getDriverDetailId() {
		return driverDetailId;
	}
	public void setDriverDetailId(int driverDetailId) {
		this.driverDetailId = driverDetailId;
	}
	public int getDriverId() {
		return driverId;
	}
	public void setDriverId(int driverId) {
		this.driverId = driverId;
	}
	public int getLicenseNumber() {
		return licenseNumber;
	}
	public void setLicenseNumber(int licenseNumber) {
		this.licenseNumber = licenseNumber;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getReportCount() {
		return reportCount;
	}
	public void setReportCount(int reportCount) {
		this.reportCount = reportCount;
	}
	public int getCompanyID() {
		return companyID;
	}
	public void setCompanyID(int companyID) {
		this.companyID = companyID;
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
