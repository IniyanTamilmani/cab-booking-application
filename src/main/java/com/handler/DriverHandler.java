package com.handler;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.Dao.CabDao;
import com.Dao.DriverDao;
import com.Dao.UserDao;
import com.enums.Enums;
import com.utils.CustomException;

import com.utils.Validations;

public class DriverHandler extends AbstractHandler {

	// to upgrade user to driver
	// users/user_id/drivers

	public String doPost(Map<String, String> parameters, JSONObject payload)
			throws CustomException, ClassNotFoundException, SQLException {

		int userId = Integer.parseInt(parameters.get("users"));

		if (!payload.has("companyName") || payload.getString("companyName") == null) {
			throw new CustomException(400, "Missing required fields: companyName.");
		}

		if (!payload.has("modelName") || payload.getString("modelName") == null) {
			throw new CustomException(400, "Missing required fields: modelName.");
		}

		if (!payload.has("registerNumber") || payload.getString("registerNumber") == null) {
			throw new CustomException(400, "Missing required fields: registerNumber.");
		}

		if (!payload.has("licenseNumber") || payload.getString("licenseNumber") == null) {
			throw new CustomException(400, "Missing required fields: licenseNumber.");
		}

		String modelName = payload.getString("modelName");
		String companyName = payload.getString("companyName");
		String registerNumber = payload.getString("registerNumber");
		String licenseNumber = payload.getString("licenseNumber");
		int companyId = new CompanyHandler().getCompanyIdByName(companyName);
		int cabTypeId = Enums.CarType.getValueByName(modelName);

		if (!Validations.isValidRegisterNumber(registerNumber)) {
			throw new CustomException(400, "RegisterNumber is invalid");
		} else if (!new CabHandler().checkRegisterNumberIsPresentOrNot(registerNumber)) {
			throw new CustomException(400, "RegisterNumber is already present");
		}

		if (!Validations.isValidLicenseNumber(licenseNumber)) {
			throw new CustomException(400, "License number is invalid");
		} else if (!checkLicenseNumberIsPresentOrNot(licenseNumber)) {
			throw new CustomException(400, "License number is already present");
		}

		ArrayList<Object> driverDetails = new ArrayList<>(Arrays.asList(userId, licenseNumber, companyId));

		// method to get cabId

		ArrayList<Object> cabDetails = new ArrayList<>(
				Arrays.asList(cabTypeId, registerNumber, userId, Enums.CabStatus.UnAvailable.getCode()));

		JSONObject message = upgradeToDriver(driverDetails, cabDetails);
		return message.toString();

	}

	// companies/company_id/drivers/driver_id --
	public String doPut(Map<String, String> parameters, JSONObject payload)
			throws ClassNotFoundException, SQLException, CustomException {

		int driverId = Integer.parseInt(parameters.get("drivers"));
		int companyId = Integer.parseInt(parameters.get("companies"));
		String role = parameters.get("sessionUserRole");
		if (payload.has("status")) {
			String action = payload.getString("status");
			if ("admin".equals(role) ) {
				if (!new CompanyHandler().getCompanySatus(companyId)) {
					throw new CustomException(400,
							"Action not permitted. Access to this resource requires super admin approval, which is still pending.");
				}
				if (companyId != getDriverCompanyId(driverId)) {
					throw new CustomException(400,
							"Unauthorized action. Admins can only view driver details for their assigned company");
				}
			}
			int status = -1;
			if (action.equals("approved")) {
				status = Enums.DriverStatus.Approved.getCode();
				if(getDriverStatus(driverId)==status)
				{
					throw new CustomException(400,"User is already not blocked");
				}
				new DriverDao().updateDriverStatus(driverId, Enums.DriverStatus.Approved.getCode()); // to approve
																										// driver
			} else if (action.equals("blocked")) {
				status = Enums.DriverStatus.Blocked.getCode();
				if(getDriverStatus(driverId)==status)
				{
					throw new CustomException(400,"User is already blocked");
				}
				new DriverDao().updateDriverStatus(driverId, Enums.DriverStatus.Blocked.getCode()); // to block driver
			}
			return new JSONObject()
					.put("message", "Driver" + Enums.DriverStatus.getNameByCode(status) + "successfully...").toString();
		}
		return null;
	}

	// companies/company_id/drivers
	// companies/company_id/drivers/driver_id --
	public String doGet(Map<String, String> parameters) throws CustomException, ClassNotFoundException, SQLException {
		if (parameters.containsKey("drivers") && parameters.get("drivers") != null) {
			int driverId = Integer.parseInt(parameters.get("drivers"));
			JSONArray driverDetails = new DriverDao().getDriverDetailsForUser(driverId);
			if (driverDetails.isEmpty()) {
				throw new CustomException(404, "Driver Details not found");
			}
			return driverDetails.toString();
		} else {
			int companyId = Integer.parseInt(parameters.get("companies"));
			if (new CompanyHandler().getCompanySatus(companyId)) {
				String action = parameters.get("status"); // companies/company_id/drivers?status="pending"
				if (action != null && action.equals("pending")) {
					JSONArray pendingRequests = new DriverDao().getDriverRequests(companyId);
					JSONArray driverApprovalRequests = new JSONArray();

					if (pendingRequests.isEmpty() || pendingRequests.getJSONObject(0).isEmpty()) {
						throw new CustomException(404, "No Approval Requests found");
					}
					for (int i = 0; i < pendingRequests.length(); i++) {
						JSONObject jsonObject = pendingRequests.getJSONObject(i);
						int modelId = jsonObject.getInt("cab_type_id");
						jsonObject.put("ModelName", Enums.CarType.getNameByValue(modelId)); // Adding new element
																							// "ModelName"
						driverApprovalRequests.put(jsonObject);
					}
					return driverApprovalRequests.toString();
				} else {
					JSONArray driverDetails = new DriverDao().getDriverDetails(companyId);
					if (driverDetails.isEmpty() || driverDetails.getJSONObject(0).isEmpty()) {
						throw new CustomException(404, "Driver Details is Empty");
					}
					for (int i = 0; i < driverDetails.length(); i++) {
						JSONObject obj = driverDetails.getJSONObject(i);
						driverDetails.getJSONObject(i).put("report_count",new RideHandler().getReportCountForDriver(obj.getInt("cab_id")));
					}
					driverDetails = new CabHandler().modifyCabIdByName(driverDetails);
					driverDetails = replaceStatusByName(driverDetails);
					return driverDetails.toString();

				}
			} else {
				throw new CustomException(400,
						"Action not permitted. Access to this resource requires super admin approval, which is still pending.");
			}
		}
	}

	// companies/company_id/drivers/driver_id
	public String doDelete(Map<String, String> parameters)
			throws CustomException, ClassNotFoundException, SQLException {
		int companyId = Integer.parseInt(parameters.get("companies"));
		int driverId = Integer.parseInt(parameters.get("drivers"));
		String role = parameters.get("sessionUserRole");
		if ("admin".equals(role)) {
			if (!new CompanyHandler().getCompanySatus(companyId)) {
				throw new CustomException(400,
						"Action not permitted. Access to this resource requires super admin approval, which is still pending.");
			}
			if (companyId != getDriverCompanyId(driverId)) {
				throw new CustomException(400,
						"Unauthorized action. Admins can only view driver details for their assigned company");
			}
		}
		if (getDriverStatus(driverId) != Enums.DriverStatus.Pending.getCode()) {
			throw new CustomException(400, "Cancellation not allowed. Request has already been accepted.");
		}

		new DriverDao().cancelRequest(driverId);
		return new JSONObject().put("message", "Successfully Cancelled the request").toString();
	}

	public JSONObject upgradeToDriver(ArrayList<Object> driverDetails, ArrayList<Object> cabDetails)
			throws ClassNotFoundException, SQLException, CustomException {
		JSONObject message = new JSONObject();
		int status = new DriverDao().upgradeToDriver(driverDetails);
		if (status == 0) {
			throw new CustomException(404, "Unable to add Driver details");
		}
		message.put("message1", "drver details added successfully");
		status = 0;

		// to add driver cab details
		status = new CabDao().addCabDetailsForDriver(cabDetails);
		if (status == 0) {
			throw new CustomException(404, "Unabe to add the cab status...");
		}
		message.put("message2", "cab details added successfully");

		return message;
	}

	public JSONObject toGetDriverCompanyIdAndCabId(int userId)
			throws ClassNotFoundException, SQLException, CustomException {
		JSONArray driverDetails = new DriverDao().toFindRole(userId);
		if (driverDetails.isEmpty() || driverDetails.getJSONObject(0).isEmpty()) {
			return null;
		}

		return driverDetails.getJSONObject(0);
	}

	private boolean checkLicenseNumberIsPresentOrNot(String LicenseNumber) throws ClassNotFoundException, SQLException {
		JSONArray status = new DriverDao().checkLicenseNumberIsPresentOrNot(LicenseNumber);
		if (!status.isEmpty() && !status.getJSONObject(0).isEmpty()) {
			return false;
		}
		return true;
	}

	public JSONArray replaceStatusByName(JSONArray driverDetails) throws CustomException {
		JSONArray updatedDriverDetails = new JSONArray();
		JSONObject details;
		for (int i = 0; i < driverDetails.length(); i++) {
			details = driverDetails.getJSONObject(i);
			int statusCode = details.getInt("status");
			String status = Enums.DriverStatus.getNameByCode(statusCode);
			details.remove("status");
			details.put("status", status);
			updatedDriverDetails.put(details);
		}
		return updatedDriverDetails;
	}

	public int getDriverStatus(int driverId) throws CustomException, ClassNotFoundException, SQLException {
		JSONArray driverDetails = new DriverDao().getDriverStatus(driverId);
		if (driverDetails.isEmpty() || driverDetails.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "driver details not found");
		}
		return driverDetails.getJSONObject(0).getInt("status");
	}
	
	public int getDriverCompanyId(int driverId) throws ClassNotFoundException, SQLException, CustomException
	{
		JSONArray driverDetails = new DriverDao().getDriverCompanyId(driverId);
		if (driverDetails.isEmpty() || driverDetails.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "driver details not found");
		}
		return driverDetails.getJSONObject(0).getInt("company_id");
	}
	
	public boolean checkDriverIsPresentOrNot(int driverId) throws ClassNotFoundException, SQLException
	{
		JSONArray driverDetails = new DriverDao().checkDriverIsPresentOrNot(driverId);
		if (driverDetails.isEmpty() || driverDetails.getJSONObject(0).isEmpty()) {
			return false;
		}
		return true;
	}
	
}
