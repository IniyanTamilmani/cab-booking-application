package com.filter;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.Dao.CompanyDao;
import com.Dao.UserDao;
import com.enums.Enums;
import com.model.Company;
import com.handler.CompanyHandler;
import com.handler.DriverHandler;
import com.handler.UserHandler;
import com.model.User;
import com.utils.CustomException;
import com.utils.JsonHelper;
import com.utils.Validations;

public class Authentication {
	public void doProcess(HttpServletRequest request, HttpServletResponse response)
			throws CustomException, IOException, ClassNotFoundException, JSONException, SQLException {

		JSONObject payload = JsonHelper.requestToJson(request);
		String[] uriParts = request.getRequestURI().split("/");
		String action = uriParts[uriParts.length - 1];

		UserHandler user = new UserHandler();
		User userModel = (User) JsonHelper.jsonToPojo(payload, User.class);

		if (action.equals("register")) {
			HttpSession session = request.getSession(true);

			Company companyModel = (Company) JsonHelper.jsonToPojo(payload, Company.class);
			String companyName = null;

			if (payload.has("companyName") && payload.getString("companyName") != null) {
				companyName = payload.getString("companyName");
			} else {
				throw new CustomException(400, "Please provide companyName");
			}
			String startedYear = companyModel.getStartedYear();
			String description = companyModel.getDescription();
			JSONObject signupDetails = null;

			String phoneNumber = userModel.getPhoneNumber();
			String password = userModel.getPassword();
			String email = userModel.getEmail();
			int userId = -1;
			String hashedPass = null;
			JSONArray userDetails = null;
			if (!user.toCheckPhoneNumber(phoneNumber)) {
				userDetails = new UserDao().toValidateUser(phoneNumber);
				JSONObject loginDetails = userDetails.getJSONObject(0);
				if (email.equals(loginDetails.getString("email"))) {

					userId = loginDetails.getInt("user_id");

					hashedPass = loginDetails.getString("password");

					if (hashedPass != null && (Validations.verifyBcrypt(password, hashedPass))) {

						String role = "user";

						if (phoneNumber.equals("9655822839")) {
							role = "superAdmin";
						} else {
							int flag = 0;
							int companyId = new CompanyHandler().toGetAdminCompanyId(userId);

							if (flag == 0 && companyId != -1) {
								role = "admin";
								flag = 1;
							}
							JSONObject driverDetails = null;
							if (flag == 0) {
								driverDetails = new DriverHandler().toGetDriverCompanyIdAndCabId(userId);
								if (driverDetails != null) {
									role = "driver";
									flag = 1;
								}
							}

						}

						if (role.equals("user")) {

							ArrayList<Object> columnValues = new ArrayList<>(
									Arrays.asList(companyName, startedYear, description, userId));

							signupDetails = new JSONObject();
							if (new CompanyHandler().checkCompanyNameIsPresentOrNot(companyName)) {
								JSONArray companyDetails = new CompanyDao().companyRegister(columnValues);
								if (!companyDetails.isEmpty() && !companyDetails.getJSONObject(0).isEmpty()) {
									int companyId = companyDetails.getJSONObject(0).getInt("company_id");
									signupDetails.put("companyId", companyId);
									session.setAttribute("companyId", companyId);

								} else {
									throw new CustomException(400, "Bad Request missing required Details");
								}

								signupDetails.put("message", "Successfullly Registered");
								signupDetails.put("userId", userId);
								signupDetails.put("role", "admin");

								// session handling

								session.setAttribute("role", "admin");
								session.setAttribute("userId", userId);
								session.setAttribute("userAgent", request.getHeader("user-agent"));
								session.setMaxInactiveInterval(30 * 60);

								Cookie cookie = new Cookie("JSESSIONID", session.getId());
								cookie.setHttpOnly(true);
								cookie.setSecure(true);
								cookie.setPath("/");
								cookie.setMaxAge(30 * 60);
								response.addCookie(cookie);
								response.getWriter().write(signupDetails.toString());

							} else {
								throw new CustomException(409, "CompanyName is already Present");
							}
						} else {
							throw new CustomException(400,
									"User is already a " + role + " so unable to upgrade him as a admin");
						}

					} else {
						throw new CustomException(401, "Invalid password");
					}

				} else {
					throw new CustomException(409, "EmailId MisMatched");
				}
			} else {
				password = Validations.validateToBcrypt(userModel.getPassword());
				ArrayList<Object> columnValues = new ArrayList<>(Arrays.asList(userModel.getName(),
						userModel.getPhoneNumber(), userModel.getEmail(), password, userModel.getAddress()));

				if (user.toCheckMail(email)) {

					userDetails = new UserDao().userSignUp(columnValues);
					if (!userDetails.isEmpty() && !userDetails.getJSONObject(0).isEmpty()) {
						userId = userDetails.getJSONObject(0).getInt("user_id");
					}
					if (userId == -1) {
						throw new CustomException(400, "Bad Request missing required Details");
					}

					signupDetails = new JSONObject();
					columnValues = new ArrayList<>(Arrays.asList(companyName, startedYear, description, userId));
					if (new CompanyHandler().checkCompanyNameIsPresentOrNot(companyName)) {
						JSONArray companyDetails = new CompanyDao().companyRegister(columnValues);
						if (!companyDetails.isEmpty() && !companyDetails.getJSONObject(0).isEmpty()) {
							int companyId = companyDetails.getJSONObject(0).getInt("company_id");
							signupDetails.put("companyId", companyId);
							session.setAttribute("companyId", companyId);
						} else {
							throw new CustomException(400, "Bad Request missing required Details");
						}
						signupDetails.put("message", "Successfullly Registered");
						signupDetails.put("role", "admin");
						signupDetails.put("userId", userId);

						session.setAttribute("role", "admin");
						session.setAttribute("userId", userId);

						session.setAttribute("userAgent", request.getHeader("user-agent"));
						session.setMaxInactiveInterval(2 * 24 * 60 * 60);

						Cookie cookie = new Cookie("JSESSIONID", session.getId());
						cookie.setHttpOnly(true);
						cookie.setSecure(true);
						cookie.setPath("/");
						cookie.setMaxAge(2 * 24 * 60 * 60);
						response.addCookie(cookie);
						response.getWriter().write(signupDetails.toString());
					} else {
						throw new CustomException(409, "CompanyName already Present");
					}

				} else {
					throw new CustomException(409, "Email already Present");
				}

			}
		}

		else if (action.equals("signup")) {
			String password = userModel.getPassword();
			password = Validations.validateToBcrypt(userModel.getPassword());
			ArrayList<Object> columnValues = new ArrayList<>(Arrays.asList(userModel.getName(),
					userModel.getPhoneNumber(), userModel.getEmail(), password, userModel.getAddress()));
			String email = userModel.getEmail();
			String phoneNumber = userModel.getPhoneNumber();

			if (user.toCheckPhoneNumber(phoneNumber)) {
				if (user.toCheckMail(email)) {
					// session
					HttpSession session = request.getSession(true);

					JSONArray userDetails = new UserDao().userSignUp(columnValues);
					int userId = -1;
					if (!userDetails.isEmpty() && !userDetails.getJSONObject(0).isEmpty()) {
						userId = userDetails.getJSONObject(0).getInt("user_id");
					}
					if (userId == -1) {
						throw new CustomException(400, "Bad Request missing required Details");
					}

					JSONObject signupDetails = new JSONObject();
					signupDetails.put("message", "Successfully Signed in...");
					signupDetails.put("userId", userId);
					signupDetails.put("role", "user");

					session.setAttribute("role", "user");
					session.setAttribute("userId", userId);
					session.setAttribute("userAgent", request.getHeader("user-agent"));
					session.setMaxInactiveInterval(2 * 24 * 60 * 60);

					Cookie cookie = new Cookie("JSESSIONID", session.getId());
					cookie.setHttpOnly(true);
					cookie.setSecure(true);
					cookie.setPath("/");
					cookie.setMaxAge(2 * 24 * 60 * 60);
					response.addCookie(cookie);
					response.getWriter().write(signupDetails.toString());
				} else {
					throw new CustomException(409, "Email already Present");
				}
			} else {
				throw new CustomException(409, "PhoneNumber already Present");
			}
		} else if (action.equals("login")) {

			String phoneNumber = userModel.getPhoneNumber();
			String password = userModel.getPassword();
			int userId = -1;
			String hashedPass = null;
			JSONArray userDetails = null;
			if (!new UserHandler().toCheckPhoneNumber(phoneNumber)) {
				userDetails = new UserDao().toValidateUser(phoneNumber);
			} else {
				throw new CustomException(400, "PhoneNumber not found");
			}
			JSONObject loginDetails = userDetails.getJSONObject(0);
			if (!loginDetails.isEmpty()) {
				userId = loginDetails.getInt("user_id");
				hashedPass = loginDetails.getString("password");
			} else {
				throw new CustomException(404, "User not found.Please do sigup and continue");
			}
			if (hashedPass != null && (Validations.verifyBcrypt(password, hashedPass))) {
				loginDetails = new JSONObject();

				HttpSession session = request.getSession(true);

				String role = "user";
				int flag = 0;
				int companyId = new CompanyHandler().toGetAdminCompanyId(userId);
				if (phoneNumber.equals("9655822839")) {
					role = "superAdmin";
				} else {

					if (flag == 0 && companyId != -1) {
						role = "admin";
						flag = 1;
					}
					JSONObject driverDetails = null;
					int cabId = -1;
					int status = -1;//
					if (flag == 0) {
						driverDetails = new DriverHandler().toGetDriverCompanyIdAndCabId(userId);
						if (driverDetails != null) {
							role = "driver";
							companyId = driverDetails.getInt("company_id");
							cabId = driverDetails.getInt("cab_id");
							status = driverDetails.getInt("status");//
							flag = 1;
						}
					}

					if (role.equals("driver")) {
						loginDetails.put("cabId", cabId);
						loginDetails.put("status", Enums.DriverStatus.getNameByCode(status));//
						session.setAttribute("cabId", cabId);
						session.setAttribute("status", Enums.DriverStatus.getNameByCode(status));//
					}
				}
				loginDetails.put("role", role);
				loginDetails.put("userId", userId);
				if (!role.equals("user")) {
					loginDetails.put("companyId", companyId);
					session.setAttribute("companyId", companyId);
				}

				// session handling
				session.setAttribute("userId", userId);
				session.setAttribute("role", role);
				session.setAttribute("userAgent", request.getHeader("user-agent"));
				session.setMaxInactiveInterval(2 * 24 * 60 * 60);

				Cookie cookie = new Cookie("JSESSIONID", session.getId());
				cookie.setHttpOnly(true);
				cookie.setSecure(true);
				cookie.setPath("/");
				cookie.setMaxAge(2 * 24 * 60 * 60);
				response.addCookie(cookie);

				loginDetails.put("message", "Successfully logged in...");
				response.setStatus(200);
				response.getWriter().write(loginDetails.toString());
			} else {
				throw new CustomException(401, "Invalid password.Please provide valid password");
			}

		} else if (action.equals("logout")) {
			HttpSession session = request.getSession(false);
			if (session != null) {
				session.invalidate();
			}
			response.setStatus(200);
			response.getWriter().write(new JSONObject().put("message", "logout successfully").toString());
		}
	}
}
