package com.model;

import com.utils.CustomException;
import com.utils.Validations;

public class User {
	private int userId;
	private String name;
	private String phoneNumber;
	private String email;
	private String password;
	private String address;
	private String createdAt;
	private String modifiedAt;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() throws CustomException {
		if(name.isEmpty())
		{
			throw new CustomException(400,"Please provide Name");
		}
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNumber() throws CustomException {
		if (phoneNumber.isEmpty()) {
			throw new CustomException(400, "Please provide phoneNumber.");
		} else if (Validations.isValidMobileNumber(phoneNumber)) {
			return phoneNumber;
		} else {
			throw new CustomException(400, "Invalid mobile number format.");
		}
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() throws CustomException {
		if (email.isEmpty()) {
			throw new CustomException(400, "Please provide emailId.");
		} else if (Validations.isValidEmail(email)) {
			return email;
		} else {
			throw new CustomException(400, "Invalid email ID format.");
		}
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() throws CustomException {
		if (password.isEmpty()) {
			throw new CustomException(400, "Please enter password");
		}else if (Validations.validatePassword(password)) {
			return password;
		} else {
			throw new CustomException(400, "Invalid password format.");
		}
		
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() throws CustomException {
		if (address.isEmpty()) {
			throw new CustomException(404, "No address found");
		}
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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
}
