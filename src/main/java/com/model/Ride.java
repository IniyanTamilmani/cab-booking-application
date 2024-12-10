package com.model;

public class Ride {
	private int rideId;
    private int customerId;
    private int cabId;
    private int startlocationId;
    private int endlocationId;
    private double fare;
    private int status; // 1->Requested, 2->Cancelled, 3->Accepted, 4->Rejected, 5->Completed
    private long startAt;
    private long endAt;
    private String otp;
    private String createdAt;
    private String modifiedAt;
    private int report;
	public int getRideId() {
		return rideId;
	}
	public void setRideId(int rideId) {
		this.rideId = rideId;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public int getCabId() {
		return cabId;
	}
	public void setCabId(int cabId) {
		this.cabId = cabId;
	}
	public int getStartlocationId() {
		return startlocationId;
	}
	public void setStartlocationId(int startlocationId) {
		this.startlocationId = startlocationId;
	}
	public int getEndlocationId() {
		return endlocationId;
	}
	public void setEndlocationId(int endlocationId) {
		this.endlocationId = endlocationId;
	}
	public double getFare() {
		return fare;
	}
	public void setFare(double fare) {
		this.fare = fare;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public long getStartAt() {
		return startAt;
	}
	public void setStartAt(long startAt) {
		this.startAt = startAt;
	}
	public long getEndAt() {
		return endAt;
	}
	public void setEndAt(long endAt) {
		this.endAt = endAt;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getModifiedAt() {
		return modifiedAt;
	}
	public void setModifiedAt(String modifiedAt) {
		this.modifiedAt = modifiedAt;
	}
	public int getReport() {
		return report;
	}
	public void setReport(int report) {
		this.report = report;
	}
}
