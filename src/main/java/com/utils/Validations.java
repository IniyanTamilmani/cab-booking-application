package com.utils;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.http.Cookie;

import org.json.JSONArray;
import org.json.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

import com.Dao.CompanyDao;
import com.Dao.UserDao;
import com.handler.CompanyHandler;
import com.handler.DriverHandler;

public class Validations {
	public static boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
	
	public static boolean isValidMobileNumber(String mobileNumber) {
        return mobileNumber != null && mobileNumber.matches("^\\d{10}$");
    }
	
	public static boolean isValidRegisterNumber(String registerNumber) {
        String regex = "^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$";        //MH12AB1234
        return registerNumber != null && registerNumber.matches(regex);
    }
	
	public static boolean isValidLicenseNumber(String licenseNumber) {
		String regex = "^[A-Z]{2}[0-9]{2}\\s?[0-9]{11}$";		//TN2912345678900
		return licenseNumber != null && licenseNumber.matches(regex);
	}
	
	public static String validateToBcrypt(String password) throws SQLException {
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        return hashedPassword;
    }

    public static boolean verifyBcrypt(String plainPassword, String hashedPassword) {
    	boolean isMatch= BCrypt.checkpw(plainPassword, hashedPassword);
        return isMatch;
    }
    
    public static boolean validatePassword(String password) {
        String regex = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"; //iniyan@17
        return password != null && password.matches(regex);
    }
}





//JSONArray userDetails = new UserDao().toValidateUser(phoneNumber);
//if (!userDetails.isEmpty() && !userDetails.getJSONObject(0).isEmpty()) {
//	JSONObject loginDetails = userDetails.getJSONObject(0);
//	if (email.equals(loginDetails.getString("email"))) {
//
//		userId = loginDetails.getInt("user_id");
//
//		hashedPass = loginDetails.getString("password");
//
//		if (hashedPass != null
//				&& (Validations.verifyBcrypt(password, hashedPass))) {
//
//			String role = "user";
//
//			if (phoneNumber.equals("9655822839")) {
//				role = "superAdmin";
//			} else {
//				int flag = 0;
//				int companyId = new CompanyHandler().toGetAdminCompanyId(userId);
//
//				if (flag == 0 && companyId != -1) {
//					role = "admin";
//					flag = 1;
//				}
//				JSONObject driverDetails = null;
//				if (flag == 0) {
//					driverDetails = new DriverHandler().toGetDriverCompanyIdAndCabId(userId);
//					if (driverDetails != null) {
//						role = "driver";
//						flag = 1;
//					}
//				}
//
//			}
//
//			if (role.equals("user")) {
//
//				ArrayList<Object> columnValues = new ArrayList<>(
//						Arrays.asList(companyName, startedYear, description, userId));
//
//				signupDetails = new JSONObject();
//				if (new CompanyHandler().checkCompanyNameIsPresentOrNot(companyName)) {
//					JSONArray companyDetails = new CompanyDao().companyRegister(columnValues);
//					if (!companyDetails.isEmpty() && !companyDetails.getJSONObject(0).isEmpty()) {
//						int companyId = companyDetails.getJSONObject(0).getInt("company_id");
//						signupDetails.put("companyId", companyId);
//						session.setAttribute("companyId", companyId);
//
//					} else {
//						throw new CustomException(400, "Bad Request missing required Details");
//					}
//
//					signupDetails.put("message", "Successfullly Registered");
//					signupDetails.put("userId", userId);
//					signupDetails.put("role", "admin");
//
//					// session handling
//
//					session.setAttribute("role", "admin");
//					session.setAttribute("userId", userId);
//					session.setAttribute("userAgent", request.getHeader("user-agent"));
//					session.setMaxInactiveInterval(30 * 60);
//
//					Cookie cookie = new Cookie("JSESSIONID", session.getId());
//					cookie.setHttpOnly(true);
//					cookie.setSecure(true);
//					cookie.setPath("/");
//					cookie.setMaxAge(30 * 60);
//					response.addCookie(cookie);
//					response.getWriter().write(signupDetails.toString());
//
//				} else {
//					throw new CustomException(409,
//							"CompanyName is already Present");
//				}
//			} else {
//				throw new CustomException(400,
//						"User is already a " + role + " so unable to upgrade him as a admin");
//			}
//
//		} else {
//			throw new CustomException(401, "Invalid password");
//		}
//
//	} else {
//		throw new CustomException(409, "EmailId MisMatched");
//	}
//} else {
//	password = Validations.validateToBcrypt(userModel.getPassword());
//	ArrayList<Object> columnValues = new ArrayList<>(Arrays.asList(userModel.getName(),
//			userModel.getPhoneNumber(), userModel.getEmail(), password, userModel.getAddress()));
//
//	if (user.toCheckPhoneNumber(phoneNumber)) {
//		if (user.toCheckMail(email)) {
//
//			userDetails = new UserDao().userSignUp(columnValues);
//			if (!userDetails.isEmpty() && !userDetails.getJSONObject(0).isEmpty()) {
//				userId = userDetails.getJSONObject(0).getInt("user_id");
//			}
//			if (userId == -1) {
//				throw new CustomException(400, "Bad Request missing required Details");
//			}
//
//			signupDetails = new JSONObject();
//			columnValues = new ArrayList<>(Arrays.asList(companyName, startedYear, description, userId));
//			if (new CompanyHandler().checkCompanyNameIsPresentOrNot(companyName)) {
//				JSONArray companyDetails = new CompanyDao().companyRegister(columnValues);
//				if (!companyDetails.isEmpty() && !companyDetails.getJSONObject(0).isEmpty()) {
//					int companyId = companyDetails.getJSONObject(0).getInt("company_id");
//					signupDetails.put("companyId", companyId);
//					session.setAttribute("companyId", companyId);
//				} else {
//					throw new CustomException(400, "Bad Request missing required Details");
//				}
//				signupDetails.put("message", "Successfullly Registered");
//				signupDetails.put("role", "admin");
//				signupDetails.put("userId", userId);
//
//				session.setAttribute("role", "admin");
//				session.setAttribute("userId", userId);
//
//				session.setAttribute("userAgent", request.getHeader("user-agent"));
//				session.setMaxInactiveInterval(2 * 24 * 60 * 60);
//
//				Cookie cookie = new Cookie("JSESSIONID", session.getId());
//				cookie.setHttpOnly(true);
//				cookie.setSecure(true);
//				cookie.setPath("/");
//				cookie.setMaxAge(2 * 24 * 60 * 60);
//				response.addCookie(cookie);
//				response.getWriter().write(signupDetails.toString());
//			} else {
//				throw new CustomException(409,
//						"CompanyName already Present");
//			}
//
//		} else {
//			throw new CustomException(409, "Email already Present");
//		}
//	} else {
//		throw new CustomException(409,
//				"PhoneNumber already Present");
//	}
//}