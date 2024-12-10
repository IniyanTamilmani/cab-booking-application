package com.model;

import com.utils.CustomException;

public class Company {
	private int companyId;
	private String name;
	private int adminId;
	private String description;
	private String startedYear;
	private int createdAt;
	private int modifiedAt;

	public int getCompanyId() {
		return companyId;
	}

	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public String getDescription() throws CustomException {
		if (description == null) {
			throw new CustomException(400, "Please provide description");
		}
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStartedYear() throws CustomException {
		if (startedYear == null) {
			throw new CustomException(400, "Please provide StartedYear");
		}
		return startedYear;
	}

	public void setStartedYear(String startedYear) {
		this.startedYear = startedYear;
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
