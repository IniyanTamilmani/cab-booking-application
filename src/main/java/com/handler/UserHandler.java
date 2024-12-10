package com.handler;

import java.sql.SQLException;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.Dao.UserDao;
import com.databaseOperations.JdbcConnector;
import com.databaseOperations.QueryExecutor;
import com.enums.Enums;
import com.model.User;
import com.utils.CustomException;
import com.utils.JsonHelper;

public class UserHandler extends AbstractHandler {

	JSONArray resultArray = null;

	// to get userDetails for specific user or Company --
	// users/user_id?role="user or driver or admin" --
	// companies/company_id/users --
	public String doGet(Map<String, String> parameters) throws ClassNotFoundException, SQLException, CustomException {
		if (parameters.containsKey("users") && parameters.get("users") != null) {
			int userId = Integer.parseInt(parameters.get("users"));
			String role = parameters.get("role");
			JSONObject userDetails = null;
			if (role.equals("user")) {
				JSONArray details = new UserDao().getUserDetails(userId);
				if (details.isEmpty() || details.getJSONObject(0).isEmpty()) {
					throw new CustomException(404, "user details not found");
				}
				userDetails = details.getJSONObject(0);
			} else if (role.equals("driver")) {
				JSONArray details = new UserDao().getDriverDetails(userId);
				if (details.isEmpty() || details.getJSONObject(0).isEmpty()) {
					throw new CustomException(404, "user details not found");
				}
				userDetails = details.getJSONObject(0);

				int status = userDetails.getInt("driverstatus");
				userDetails.remove("driverstatus");
				String driverstatus = Enums.DriverStatus.getNameByCode(status);
				userDetails.put("driverstatus", driverstatus);

				status = userDetails.getInt("cabstatus");
				userDetails.remove("cabstatus");
				String cabstatus = Enums.CabStatus.getNameByValue(status);
				userDetails.put("cabstatus", cabstatus);
				int cabId = new CabHandler().getCabId(userId);
				int weeklyEarnings = new RideHandler().driverWeeklyEarnings(cabId);
				userDetails.put("earnings", weeklyEarnings);

			} else if (role.equals("admin") || role.equals("superAdmin")) {
				JSONArray details = new UserDao().getAdminDetails(userId);
				if (details.isEmpty() || details.getJSONObject(0).isEmpty()) {
					throw new CustomException(404, "user details not found");
				}
				userDetails = details.getJSONObject(0);
				String role1 = Enums.CompanyStatus.getNameByCode(userDetails.getInt("status"));
				userDetails.remove("status");
				userDetails.put("role", role1);

			}
			return userDetails.toString();
		} else if (parameters.containsKey("companies")) {
			int companyId = Integer.parseInt(parameters.get("companies"));
			if (new CompanyHandler().getCompanySatus(companyId)) {
				int adminId = new CompanyHandler().getAdminId(companyId);
				JSONArray userDetails = new UserDao().getUsers(companyId);
				int index = -1;
				for (int i = 0; i < userDetails.length(); i++) {
					JSONObject obj = userDetails.getJSONObject(i);
					if (obj.getInt("user_id") == adminId) {
						index=i;
					}
					userDetails.getJSONObject(i).put("report_count",new RideHandler().getReportCountForUser(obj.getInt("user_id")));
				}
				userDetails.remove(index);
				if (userDetails.isEmpty()) {
					throw new CustomException(404, "User details not found.");
				}
				userDetails = replaceStatusByName(userDetails);
				return userDetails.toString();
			} else {
				throw new CustomException(400,
						"Action not permitted. Access to this resource requires super admin approval, which is still pending.");
			}
		}
		throw new CustomException(404, "Action not defined");
	}

	public String doPost(Map<String, String> parameters, JSONObject Payload) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public String doPut(Map<String, String> parameters, JSONObject Payload) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public String doDelete(Map<String, String> parameters) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public boolean toCheckMail(String email) throws ClassNotFoundException, SQLException {
		JSONArray mail = new UserDao().toCheckMail(email);
		if (!mail.isEmpty() && !mail.getJSONObject(0).isEmpty()) {
			return false;
		}
		return true;
	}

	public boolean toCheckPhoneNumber(String PhoneNumber) throws ClassNotFoundException, SQLException {
		JSONArray details = new UserDao().toCheckPhoneNumber(PhoneNumber);
		if (!details.isEmpty() && !details.getJSONObject(0).isEmpty()) {
			return false;
		}
		return true;
	}

	public JSONArray replaceStatusByName(JSONArray userDetails) throws CustomException {
		JSONArray updatedUserDetails = new JSONArray();
		JSONObject details;
		for (int i = 0; i < userDetails.length(); i++) {
			details = userDetails.getJSONObject(i);
			if (details.getBoolean("is_blocked")) {
				details.put("status", "Blocked");
			} else {
				details.put("status", "Approved");
			}
			details.remove("is_blocked");
			updatedUserDetails.put(details);
		}
		return updatedUserDetails;
	}
	
	public boolean checkUserPresentOrNot(int userId) throws ClassNotFoundException, SQLException
	{
		JSONArray userDetails = new UserDao().checkUserPresentOrNot(userId);
		if (userDetails.isEmpty() || userDetails.getJSONObject(0).isEmpty()) {
			return true;
		}
		return false;
	}

}
