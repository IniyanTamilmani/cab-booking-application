
package com.handler;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.Dao.BlockListDao;
import com.Dao.DriverDao;
import com.utils.CustomException;

public class BlockListHandler extends AbstractHandler {

//	companies/company_id/blocklists
	public String doGet(Map<String, String> parameters) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

//	companies/company_id/users/user_id
	public String doPost(Map<String, String> parameters, JSONObject payload)
			throws CustomException, ClassNotFoundException, SQLException {


		if(!payload.get("status").equals("block"))
		{
			throw new CustomException(400,"Action not defined");
		}
		int userId = Integer.parseInt(parameters.get("users"));
		int companyId = Integer.parseInt(parameters.get("companies"));
		
		if(new UserHandler().checkUserPresentOrNot(userId))
		{
			throw new CustomException(400,"User is not found");
		}
		
		if(!checkUserBlockedOrNot(userId,companyId))
		{
			throw new CustomException(400,"User is already blocked");
		}
		
		String role = parameters.get("sessionUserRole");
		if ("admin".equals(role)) {
			if (!new CompanyHandler().getCompanySatus(companyId)) {
				throw new CustomException(400,
						"Action not permitted. Access to this resource requires super admin approval, which is still pending.");
			}
		}
		ArrayList<Object> userDetails = new ArrayList(Arrays.asList(userId, companyId));
		int status = new BlockListDao().blockUser(userDetails);
		if (status == 0) {
			throw new CustomException(400, "INVALID REQUEST DATA");
		}
		return new JSONObject("message", "USER IS BLOCKED SUCCESSFULY").toString();

	}

	public String doPut(Map<String, String> parameters, JSONObject payload) throws CustomException {
		throw new CustomException(404, "Action not defined");
	}


	public String doDelete(Map<String, String> parameters)
			throws CustomException, ClassNotFoundException, SQLException {
		int companyId = Integer.parseInt(parameters.get("companies"));
		int userId = Integer.parseInt(parameters.get("users"));
		String role = parameters.get("sessionUserRole");
		if ("admin".equals(role)) {
			if (!new CompanyHandler().getCompanySatus(companyId)) {
				throw new CustomException(400,
						"Action not permitted. Access to this resource requires super admin approval, which is still pending.");
			}
		}
		if(new UserHandler().checkUserPresentOrNot(userId))
		{
			throw new CustomException(400,"User is not found");
		}
		
		if(checkUserBlockedOrNot(userId,companyId))
		{
			throw new CustomException(400,"User is not blocked");
		}
		
		int status = new BlockListDao().unblockUser(userId, companyId);
		if (status == 0) {
			throw new CustomException(404, "User is not present in the blocklist");
		}
		return new JSONObject("message", "successfully unblocked the user").toString();
	}
	
	public ArrayList<Integer> userAvailableCompanies(int userId)
			throws ClassNotFoundException, SQLException, CustomException {
		ArrayList<Integer> companyIds = new ArrayList<>();
		JSONArray companies = new BlockListDao().userAvailableCompanies(userId);
		if (companies.isEmpty()) {
			throw new CustomException(404, "You are blocked in all the companies.So unable to find the cabs for you");
		}
		for (int i = 0; i < companies.length(); i++) {
			companyIds.add(companies.getJSONObject(i).getInt("company_id"));
		}
		return companyIds;
	}
	
	public boolean checkUserBlockedOrNot(int userId,int companyId) throws ClassNotFoundException, SQLException
	{
		JSONArray userDetails = new BlockListDao().checkUserBlockedOrNot(companyId,userId);
		if (userDetails.isEmpty() || userDetails.getJSONObject(0).isEmpty()) {
			return true;
		}
		return false;
	}
	
}
