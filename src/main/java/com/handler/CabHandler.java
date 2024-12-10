package com.handler;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import com.Dao.CabDao;
import com.enums.Enums;
import com.utils.CustomException;

public class CabHandler extends AbstractHandler {
	public JSONArray resultArray = null;

	// Companies/company_id/drivers/driver_id/cabs/cab_id --
	public String doPut(Map<String, String> parameters, JSONObject payload)
			throws CustomException, ClassNotFoundException, SQLException {

		int cabId = Integer.parseInt(parameters.get("cabs"));

		if (payload.has("status")) {

			String action = payload.getString("status");
			int driverId = Integer.parseInt(parameters.get("sessionUserId"));
			int driverStatus = new DriverHandler().getDriverStatus(driverId);
			if (driverStatus != Enums.DriverStatus.Approved.getCode()) {
				if (driverStatus == Enums.DriverStatus.Pending.getCode()) {
					throw new CustomException(400,
							"Account access restricted: Your account has not yet been approved. Contact support if you need further assistance.");
				}
				if (driverStatus == Enums.DriverStatus.Blocked.getCode()) {
					throw new CustomException(400,
							"Your account has been blocked by the administrator. Please contact support for further assistance.");
				}
			}
			JSONObject message = new JSONObject();
			int status = -1;
			if (action.equals("available")) {
				status = Enums.CabStatus.Available.getCode();
			} else if (action.equals("unavailable")) {
				status = Enums.CabStatus.UnAvailable.getCode();
			} else {
				throw new CustomException(400, "Invalid cab status:" + action);
			}
			JSONArray cabDetails = new CabDao().toGetCabStatus(cabId);
			int cabStatus = cabDetails.getJSONObject(0).getInt("status");
			if (cabStatus == Enums.CabStatus.Riding.getCode()) {
				throw new CustomException(400, "Please complete the ride before check-out");
			}
			if (status != -1) {
				int flag = new CabDao().updateCabStatus(cabId, status);
				if (flag == 1) {
					return message.put("message", "Cab status updated Successfully").toString();
				} else {
					throw new CustomException(404, "Cab not found.Unable to update the cab status");
				}
			}
		} else if (payload.has("location")) {
			int driverId = Integer.parseInt(parameters.get("sessionUserId"));
			String locationName = payload.getString("location");
			int driverStatus = new DriverHandler().getDriverStatus(driverId);
			if (driverStatus != Enums.DriverStatus.Approved.getCode()) {
				if (driverStatus == Enums.DriverStatus.Pending.getCode()) {
					throw new CustomException(400,
							"Account access restricted: Your account has not yet been approved. Contact support if you need further assistance.");
				}
				if (driverStatus == Enums.DriverStatus.Blocked.getCode()) {
					throw new CustomException(400,
							"Your account has been blocked by the administrator. Please contact support for further assistance.");
				}
			}
			if(new RideHandler().GetAvailableBookingsCountForDriver(cabId)!=0)
			{
				throw new CustomException(400,
						"Please complete the ride requests");
			}
			
			if (locationName == null) {
				throw new CustomException(400, "Invalid input. location is missing.");
			}

			int locationId = new LocationHandler().getLocationId(locationName);
			if (locationId == -1) {
				throw new CustomException(404, "The specified location is not available.");
			}
			// to update cabs current location --
			int updatedStatus = new CabDao().updateCabLocation(cabId, locationId);
			if (updatedStatus == 1) {
				return new JSONObject().put("message", "Cab location updated Successfully").toString();
			} else {
				throw new CustomException(404, "Cab not found.Unable to update the cabstatus");
			}
		}
		throw new CustomException(400, "Action not defined");
	}

	// /cabs?start_location=start_location & end_location=end_location -- to show available cabs for booking
	public String doGet(Map<String, String> parameters) throws CustomException, ClassNotFoundException, SQLException {
		int userId = Integer.parseInt(parameters.get("sessionUserId"));
		String startLocation = parameters.get("start_location");
		String endLocation = parameters.get("end_location");

		int startLocationId = new LocationHandler().getLocationId(startLocation);
		int endLocationId = new LocationHandler().getLocationId(endLocation);
		if (startLocationId == -1) {
			throw new CustomException(404, startLocation + " is not found");
		}
		if (endLocationId == -1) {
			throw new CustomException(404, endLocation + " is not found");
		}

		ArrayList<Double> coordinates = new LocationHandler().getLocationCoOrdinates(startLocation);
		double startlatitude = coordinates.get(0);
		double startlongitude = coordinates.get(1);
		coordinates = new LocationHandler().getLocationCoOrdinates(endLocation);
		double endlatitude = coordinates.get(0);
		double endlongitude = coordinates.get(1);
		double distance = new LocationHandler().distanceFinder(startlatitude, startlongitude, endlatitude,
				endlongitude);
		ArrayList<Integer> companyIds = new BlockListHandler().userAvailableCompanies(userId);
		Set<Integer> nearbyLocations = new LocationHandler().getNearByLocations(startlatitude, startlongitude);
		Set<Integer> availableCabIds = availableCabs(companyIds, nearbyLocations);

		// if user is a driver then to avoid the cab
		if ("driver".equals(parameters.get("sessionUserRole"))) {
			JSONArray userCabDetails = new CabDao().getCabId(userId);

			if (!userCabDetails.isEmpty() && !userCabDetails.getJSONObject(0).isEmpty()) {
				int cabId = userCabDetails.getJSONObject(0).getInt("cab_id");
				if (cabId != 0 && availableCabIds.contains(cabId)) {
					availableCabIds.remove(cabId);
				}
			}
		}
		int cabId = new RideHandler().toGetCurrentRideCabId(userId, Enums.RideStatus.Waiting.getCode());
		if(cabId!=-1)
		{		
			if (availableCabIds.contains(cabId)) {
				availableCabIds.remove(cabId);
			}
		}

		JSONArray availableCabDetails = new JSONArray();

		for (Integer cabid : availableCabIds) {
			JSONObject jsonObject = getAvailableCabDetails(cabid);
			int companyId = jsonObject.getInt("company_id");
			int cabModelId = jsonObject.getInt("cab_type_id");
			double fare = distance * new FareHandler().getFare(companyId, cabModelId);
			String formattedFare = String.format("%.2f", fare);
			jsonObject.put("fare", formattedFare);
			jsonObject.put("startLocation", startLocation);
			jsonObject.put("endLocation", endLocation);
			jsonObject.put("model", Enums.CarType.getNameByValue(cabModelId));

			availableCabDetails.put(jsonObject);

		}
		
		
		if (availableCabDetails.isEmpty()) {
			throw new CustomException(404, "No Cabs is available at the moment");
		}
		return availableCabDetails.toString();
	}

	public String doPost(Map<String, String> parameters, JSONObject payload) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public String doDelete(Map<String, String> parameters) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public JSONObject getAvailableCabDetails(int cabId) throws CustomException, ClassNotFoundException, SQLException {
		JSONArray cabDetails = new CabDao().getAvailableCabDetails(cabId);
		if (cabDetails.isEmpty() || cabDetails.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "Cab Details not found");
		}
		return cabDetails.getJSONObject(0);
	}

	public HashSet<Integer> availableCabs(ArrayList<Integer> companyIds, Set<Integer> nearbyLocations)
			throws ClassNotFoundException, SQLException, CustomException {
		HashSet<Integer> availableCabIds = new HashSet<>();
		JSONArray nearByAvailableCabIds = null;

		for (int i = 0; i < companyIds.size(); i++) {
			for (int locationId : nearbyLocations) {
				nearByAvailableCabIds = new CabDao().getNearByAvailableCabIds(locationId, companyIds.get(i));
				for (int k = 0; k < nearByAvailableCabIds.length(); k++) {
					int cabId = nearByAvailableCabIds.getJSONObject(k).getInt("cab_id");
					int bookingsCountForDriver = new RideHandler().GetAvailableBookingsCountForDriver(cabId);
					if (bookingsCountForDriver <= 3) {
						availableCabIds.add(cabId);
					}
				}
			}
		}
		return availableCabIds;
	}

	public int getCabId(int driverId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray result = new CabDao().getCabId(driverId);
		if (result.isEmpty() || result.getJSONObject(0).isEmpty()) {
			throw new CustomException(400, "driver not found");
		}
		return result.getJSONObject(0).getInt("cab_id");

	}
	
	
	public int getDriverId(int cabId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray result = new CabDao().getDriverId(cabId);
		if (result.isEmpty() || result.getJSONObject(0).isEmpty()) {
			throw new CustomException(400, "Cab not found");
		}
		return result.getJSONObject(0).getInt("driver_id");

	}

	public int getCabModelId(int cabId) throws CustomException, ClassNotFoundException, SQLException {
		JSONArray modelId = new CabDao().getModelId(cabId);
		if (modelId.isEmpty() || modelId.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "Unable to find Cab Model");
		}
		return modelId.getJSONObject(0).getInt("cab_type_id");

	}

	public void updateCabStatus(int cabId, int status) throws ClassNotFoundException, SQLException, CustomException {
		int flag = new CabDao().updateCabStatus(cabId, status);
		if (flag != 1) {
			throw new CustomException(404, "Cab not found");
		}

	}

	public int getCabStatus(int cabId) throws CustomException, ClassNotFoundException, SQLException {
		JSONArray cabStatus = new CabDao().toGetCabStatus(cabId);
		if (cabStatus.isEmpty() || cabStatus.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "Cab Status not found");
		}
		return cabStatus.getJSONObject(0).getInt("status");
	}

	public void updateCabLocation(int cabId, int locationId)
			throws ClassNotFoundException, SQLException, CustomException {
		int flag = new CabDao().updateCabLocation(cabId, locationId);
		if (flag != 1) {
			throw new CustomException(404, "cab not found..unable to update cab location");
		}

	}

	public JSONArray modifyCabIdByName(JSONArray cabDetails) throws CustomException {
		JSONArray updatedCabDetails = new JSONArray();
		JSONObject details;
		for (int i = 0; i < cabDetails.length(); i++) {
			details = cabDetails.getJSONObject(i);
			int cabId = details.getInt("cab_type_id");
			String cabModel = Enums.CarType.getNameByValue(cabId);
			details.put("cabModel", cabModel);
			updatedCabDetails.put(details);
		}
		return updatedCabDetails;
	}

	
	public boolean checkRegisterNumberIsPresentOrNot(String RegisterNumber)
			throws ClassNotFoundException, SQLException {
		JSONArray status = new CabDao().checkRegisterNumberIsPresentOrNot(RegisterNumber);
		if (!status.isEmpty() && !status.getJSONObject(0).isEmpty()) {
			return false;
		}
		return true;
	}

}
