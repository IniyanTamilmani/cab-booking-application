package com.handler;

import java.sql.SQLException;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.Dao.FareDao;
import com.enums.Enums;
import com.utils.CustomException;

import com.Dao.*;;

public class FareHandler extends AbstractHandler {

	// companies/company_id/cabs/model_id/fares/fare_id --
	public String doPut(Map<String, String> parameters, JSONObject payload)
			throws CustomException, ClassNotFoundException, SQLException {
		int companyId = Integer.parseInt(parameters.get("companies"));
		int cabModelId = Integer.parseInt(parameters.get("cabs"));
		String modelName = Enums.CarType.getNameByValue(cabModelId);
		String role = parameters.get("sessionUserRole");
		if ("admin".equals(role)) {
			if (!new CompanyHandler().getCompanySatus(companyId)) {
				throw new CustomException(400,
						"Action not permitted. Access to this resource requires super admin approval, which is still pending.");
			}
		}
		if (modelName.isEmpty()) {
			throw new CustomException(400, "Specified Cab Model is not present");
		}

		if (!payload.has("fare") || payload.getDouble("fare") <= 0) {
			throw new CustomException(400, "fare not found");
		}
		Double fare = payload.getDouble("fare");

		new FareDao().updateCabFare(fare, companyId,cabModelId);
		
		return new JSONObject().put("message", "Cab fare updated Successfully").toString();

	}

	//companies/company_id/fares
	public String doGet(Map<String, String> parameters) throws CustomException, ClassNotFoundException, SQLException {
		int companyId = Integer.parseInt(parameters.get("companies"));
		if (new CompanyHandler().getCompanySatus(companyId)) {
			JSONArray fareDetails = new FareDao().fareDetails(companyId);
			fareDetails=new CabHandler().modifyCabIdByName(fareDetails);
			if (fareDetails.isEmpty() || fareDetails.getJSONObject(0).isEmpty()) {
				throw new CustomException(404, "fare details not found");
			}
			return fareDetails.toString();
		} else {
			throw new CustomException(400, "Action not permitted. Access to this resource requires super admin approval, which is still pending.");
		}
	}

	public String doPost(Map<String, String> parameters, JSONObject payload) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public String doDelete(Map<String, String> parameters) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public double getFare(int companyId, int cabModelId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray fare = new FareDao().getFare(companyId, cabModelId);
		if (fare.isEmpty() || fare.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "Unable to find the Fare");
		}
		return fare.getJSONObject(0).getDouble("fare_per_km");
	}
	
	public void insertCabFare(int companyId) throws ClassNotFoundException, SQLException
	{
		for (Enums.CarType carType : Enums.CarType.values()) {
			new FareDao().insertCabFare(companyId,carType.getValue());
        }
	}
	
	

}
