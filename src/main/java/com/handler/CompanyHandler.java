package com.handler;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.utils.CustomException;
import com.Dao.*;
import com.enums.Enums;

public class CompanyHandler extends AbstractHandler {
	/// companies?status=pending
	public String doGet(Map<String, String> parameters) throws CustomException, ClassNotFoundException, SQLException {
		JSONArray companyDetails = new JSONArray();
		if (parameters.containsKey("status") && parameters.get("status").equals("pending")) {
			companyDetails = new CompanyDao().pendingRequest();
			if (!companyDetails.isEmpty()) {
				return companyDetails.toString();
			} else {
				throw new CustomException(404, "No Pending Requests Available");
			}
		} else if (parameters.containsKey("status") && parameters.get("status").equals("approved")) {
			companyDetails = new CompanyDao().availableCompanies();
			if (!companyDetails.isEmpty()) {
				return companyDetails.toString();
			} else {
				throw new CustomException(404, "No Companies present");
			}
		} else {
			companyDetails = new CompanyDao().availableCompanyNames();
			if (!companyDetails.isEmpty()) {
				return companyDetails.toString();
			} else {
				throw new CustomException(404, "No Companies present");
			}
		}
	}

	public String doPost(Map<String, String> parameters, JSONObject payload) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public String doPut(Map<String, String> parameters, JSONObject payload)
			throws CustomException, ClassNotFoundException, SQLException {
		int companyId = Integer.parseInt(parameters.get("companies"));
		if (new CompanyHandler().getCompanySatus(companyId)) {
			throw new CustomException(400,
					"Already approved the company");
		}
		new CompanyDao().acceptRequestApproval(companyId);
		new FareHandler().insertCabFare(companyId);
		return new JSONObject("message", "Successfully approved the request").toString();
	}

	public String doDelete(Map<String, String> parameters)
			throws CustomException, JSONException, ClassNotFoundException, SQLException {
		int companyId = Integer.parseInt(parameters.get("companies"));
		new CompanyHandler().getCompanySatus(companyId);
		new CompanyDao().removeCompanyDetails(companyId);
		return new JSONObject("message", "Successfully removed the company from the organisation").toString();
	}

	public ArrayList<Integer> getCompanyIds() throws CustomException, ClassNotFoundException, SQLException {
		ArrayList<Integer> companyIds = new ArrayList<>();
		JSONArray companies = new CompanyDao().getCompanyIds();
		if (companies.isEmpty() || companies.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "No companies found");
		}
		for (int i = 0; i < companies.length(); i++) {
			companyIds.add(companies.getJSONObject(i).getInt("company_id"));
		}

		return companyIds;

	}

	public int toGetAdminCompanyId(int userId) throws CustomException, ClassNotFoundException, SQLException {
		JSONArray checkUserRole = new CompanyDao().toCheckUserRole(userId);
		if (checkUserRole.isEmpty() || checkUserRole.getJSONObject(0).isEmpty()) {
			return -1;
		}
		return checkUserRole.getJSONObject(0).getInt("company_id");

	}

	public int getCompanyIdByName(String companyName) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray companyIdByName = new CompanyDao().getCompanyIdByName(companyName);
		if (companyIdByName.isEmpty() || companyIdByName.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "CompanyId not found");
		}
		return companyIdByName.getJSONObject(0).getInt("company_id");

	}

	public boolean checkCompanyNameIsPresentOrNot(String companyName)
			throws ClassNotFoundException, SQLException, CustomException {
//		JSONArray companyIdByName = new CompanyDao().getCompanyIdByName(companyName);
		JSONArray companyIdByName = new CompanyDao().checkCompanyNameisPresentOrNot(companyName);
		if (companyIdByName.isEmpty() || companyIdByName.getJSONObject(0).isEmpty()) {
			return true;
		}
		throw new CustomException(404, "CompanyName is already Present");

	}

	public int getAdminId(int companyId) throws CustomException, ClassNotFoundException, SQLException {
		JSONArray adminDetails = new CompanyDao().getAdminId(companyId);
		if (adminDetails.isEmpty() || adminDetails.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "CompanyId not found");
		}
		return adminDetails.getJSONObject(0).getInt("admin_id");
	}

	public boolean getCompanySatus(int companyId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray role = new CompanyDao().getCompanyStatus(companyId);
		if (!role.isEmpty() && !role.getJSONObject(0).isEmpty()) {
			int status = role.getJSONObject(0).getInt("status");
			if (status == Enums.CompanyStatus.User.getCode()) {
				return false;
			} else {
				return true;
			}
		}
		throw new CustomException(400, "Company not found");
	}

	public boolean tocheckUserStatusInCompany(int companyId, int userId) throws ClassNotFoundException, SQLException {
		JSONArray status = new CompanyDao().tocheckUserStatusInCompany(companyId, userId);
		if (status.isEmpty()) {
			return true;
		}
		return false;
	}

}
