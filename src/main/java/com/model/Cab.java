package com.model;

public class Cab {
	private int cabId;
	private int cabTypeId;
	private int registerNumber;
	private int status;
	private int currentlocationId;
	private int driverId;
	private int createdAt;
	private int modifiedAt;
	public int getCabId() {
		return cabId;
	}
	public void setCabId(int cabId) {
		this.cabId = cabId;
	}
	public int getCabTypeId() {
		return cabTypeId;
	}
	public void setCabTypeId(int cabTypeId) {
		this.cabTypeId = cabTypeId;
	}
	public int getRegisterNumber() {
		return registerNumber;
	}
	public void setRegisterNumber(int registerNumber) {
		this.registerNumber = registerNumber;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getCurrentlocationId() {
		return currentlocationId;
	}
	public void setCurrentlocationId(int currentlocationId) {
		this.currentlocationId = currentlocationId;
	}
	public int getDriverId() {
		return driverId;
	}
	public void setDriverId(int driverId) {
		this.driverId = driverId;
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
