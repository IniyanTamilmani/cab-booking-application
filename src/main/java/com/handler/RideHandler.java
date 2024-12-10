package com.handler;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.enums.*;
import com.utils.CustomException;
import com.utils.Helper;

import com.Dao.*;

public class RideHandler extends AbstractHandler {

	JSONArray resultArray = null;
	int res;

	// to book a cab
	// companies/company_id/drivers/driver_id/cabs/cab_id/rides -----
	public String doPost(Map<String, String> parameters, JSONObject payload)
			throws ClassNotFoundException, SQLException, CustomException {

		int companyId = Integer.parseInt(parameters.get("companies"));
		int driverId = Integer.parseInt(parameters.get("drivers"));
		int cabId = Integer.parseInt(parameters.get("cabs"));
		int userId = Integer.parseInt(parameters.get("sessionUserId"));

		if (!new CompanyHandler().getCompanySatus(companyId)) {
			throw new CustomException(403,
					"Booking failed. The selected company is currently unapproved. Please choose a different company or try again later");
		}

		if (new DriverHandler().getDriverCompanyId(driverId) != companyId) {
			throw new CustomException(403, "The driver is not authorized for the specified company");
		}

		if (new CabHandler().getDriverId(cabId) != driverId) {
			throw new CustomException(400, "The cab assignment does not match the driver provided in the request");
		}

		// to validate user status before booking
		if (toGetUserRideStatus(userId, Enums.RideStatus.Waiting.getCode())
				|| toGetUserRideStatus(userId, Enums.RideStatus.Accepted.getCode())
				|| toGetUserRideStatus(userId, Enums.RideStatus.Started.getCode())) {
			throw new CustomException(409, "Unable to book a cab.Previous booking in progress"); // 409->conflict
		}

		if (!new CompanyHandler().tocheckUserStatusInCompany(companyId, userId)) {
			throw new CustomException(400, "User is blocked");
		}

		int cabStatus = new CabHandler().getCabStatus(cabId);
		if (cabStatus != Enums.CabStatus.Available.getCode()) {
			throw new CustomException(400, "Cab is not Available");
		}

		if (!payload.has("startLocation") || payload.getString("startLocation") == null) {
			throw new CustomException(400, "Invalid input. Pickup location is missing.");
		}

		if (!payload.has("endLocation") || payload.getString("endLocation") == null) {
			throw new CustomException(400, "Invalid input. Drop-off location is missing.");
		}

		String startLocation = payload.getString("startLocation");
		String endLocation = payload.getString("endLocation");
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
		int cabModelId = new CabHandler().getCabModelId(cabId);
		double fare = new FareHandler().getFare(companyId, cabModelId);

		ArrayList<Object> columnValues = new ArrayList<>(
				Arrays.asList(userId, cabId, startLocationId, endLocationId, fare * distance));

		JSONArray bookingDetails = new RideDao().bookCab(columnValues);
		if (bookingDetails.isEmpty() || bookingDetails.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "Cab not found..Unable to book a cab");
		}
		return bookingDetails.getJSONObject(0).toString();
	}

	// companies/company_id/drivers/driver_id/cabs/cab_id/rides/ride_id
	// users/user_id/rides/ride_id
	public String doPut(Map<String, String> parameters, JSONObject payload)
			throws IOException, JSONException, ClassNotFoundException, SQLException, CustomException {

		if (payload.has("report") && payload.getString("report") != null) {
			String message = payload.getString("report");
			int status = 0;
			int rideId = Integer.parseInt(parameters.get("rides"));
			if (parameters.containsKey("users")) {
				int userId = Integer.parseInt(parameters.get("sessionUserId"));
				int rideUserId = getRideCustomerId(rideId);
				if (rideUserId != userId) {
					throw new CustomException(400, "You can only report issues with your own ride");
				}
				status = new RideDao().reportDriver(rideId, message);
				if (status == 0) {
					throw new CustomException(404, "Unable to report the driver");
				}
				return new JSONObject("message", "reported successfully").toString();
			} else if (parameters.containsKey("drivers")) {
				
				int cabId = Integer.parseInt(parameters.get("cabs"));
				int rideCabId = getRideCabId(rideId);
				int driverId = Integer.parseInt(parameters.get("sessionUserId"));
				int driverStatus = new DriverHandler().getDriverStatus(driverId);
				if (driverStatus != Enums.DriverStatus.Approved.getCode()) {
					if (driverStatus == Enums.DriverStatus.Pending.getCode()) {
						throw new CustomException(400,
								"Account access restricted: Your account has not yet been approved. Contact support if you need further assistance.");
					}
				}
				if (rideCabId != cabId) {
					throw new CustomException(400, "You can only report issues with your own rides");
				}
				status = new RideDao().reportUser(rideId, message);
				if (status == 0) {
					throw new CustomException(404, "Unable to report the user");
				}
				return new JSONObject("message", "reported successfully").toString();
			}
			throw new CustomException(400, "Bad Request");
		}

		if (!payload.has("status") || payload.getString("status") == null) {
			throw new CustomException(400, "Action not defined");
		}

		JSONObject responseMessage = new JSONObject();
		String action = payload.getString("status");

		int rideId = Integer.parseInt(parameters.get("rides"));

		if (parameters.containsKey("users") && parameters.get("users") != null) {

			int userId = Integer.parseInt(parameters.get("users"));
			if (action.equals("cancelled")) {
				responseMessage = toCancelRide(userId, rideId);
				return responseMessage.toString();
			}
			throw new CustomException(400, "Action not defined");
		} else if (parameters.containsKey("drivers") && parameters.get("drivers") != null) {
			int cabId = Integer.parseInt(parameters.get("cabs"));
			
			int rideCabId = getRideCabId(rideId);
			int driverId = Integer.parseInt(parameters.get("sessionUserId"));
			int driverStatus = new DriverHandler().getDriverStatus(driverId);
			if (driverStatus != Enums.DriverStatus.Approved.getCode()) {
				if (driverStatus == Enums.DriverStatus.Pending.getCode()) {
					throw new CustomException(400,
							"Account access restricted: Your account has not yet been approved. Contact support if you need further assistance.");
				}
			}
			if (rideCabId != cabId) {
				throw new CustomException(400, "You can only report issues with your own rides");
			}
			
			
			if (action.equals("accepted")) {
				responseMessage = toAcceptRide(rideId, cabId);
				new RideDao().toRejectOtherRides(cabId);
			} else if (action.equals("completed")) {
				responseMessage = toCompleteRide(rideId, cabId);

			} else if (action.equals("rejected")) {
				responseMessage = toRejectRide(rideId);
			} else if (action.equals("started")) {
				if(!payload.has("Otp"))
				{
					throw new CustomException(400,"Otp is missing");
				}
				String otp = payload.getString("Otp");
				responseMessage = toStartRide(otp, rideId);
			}

			return responseMessage.toString();

		}
		throw new CustomException(404, "Action not defined");
	}

	// companies/company_id/rides
	// companies/company_id/drivers/driver_id/cabs/cab_id/rides
	// users/user_id/rides?status=progress
	public String doGet(Map<String, String> parameters) throws ClassNotFoundException, SQLException, CustomException {
		resultArray = new JSONArray();
		if (parameters.containsKey("companies") && parameters.containsKey("drivers")
				&& parameters.containsKey("cabs")) {
			int driverId = Integer.parseInt(parameters.get("sessionUserId"));
			int driverStatus = new DriverHandler().getDriverStatus(driverId);
			if (driverStatus != Enums.DriverStatus.Approved.getCode()) {
				if (driverStatus == Enums.DriverStatus.Pending.getCode()) {
					throw new CustomException(400,
							"Account access restricted: Your account has not yet been approved. Contact support if you need further assistance.");
				}
			}
			int cabId = Integer.parseInt(parameters.get("cabs"));
			if (parameters.containsKey("status")) {
				if (driverStatus == Enums.DriverStatus.Blocked.getCode()) {
					throw new CustomException(400,
							"Your account has been blocked by the administrator. Please contact support for further assistance.");
				}
				String action = parameters.get("status"); // ? status = waiting
				if (action.equals("waiting")) {

					JSONArray availableBookings = GetAvailableBookingsForDriver(cabId);
					return availableBookings.toString();
				} else if (action.equals("progress")) // ? status = progress
				{
					JSONObject currentRide = toGetRideinProgress(cabId);
					return currentRide.toString();
				}
			} else {
				JSONArray cabRideHistory = new RideDao().getCabRideDetails(cabId);
				if (cabRideHistory.isEmpty()) {
					throw new CustomException(404, "RideHistory is Empty");
				}
				cabRideHistory = toReplaceStatusbyName(cabRideHistory);
				return cabRideHistory.toString();

			}
		} else if (parameters.containsKey("companies")) {
			int companyId = Integer.parseInt(parameters.get("companies"));
			if (new CompanyHandler().getCompanySatus(companyId)) {
				JSONArray rideHistory = toGetRidesForCompany(companyId);
				rideHistory = toReplaceStatusbyName(rideHistory);
				return rideHistory.toString();
			} else {
				throw new CustomException(400,
						"Action not permitted. Access to this resource requires super admin approval, which is still pending.");
			}
		} else if (parameters.containsKey("users")) {

			int userId = Integer.parseInt(parameters.get("sessionUserId"));
			if (parameters.containsKey("status") && "progress".equals(parameters.get("status"))) {
				JSONObject currentBooking = toGetCurrentBookingForUser(userId);
				return currentBooking.toString();
			} else {
				JSONArray userRides = toGetUserRides(userId);
				return userRides.toString();
			}
		}
		throw new CustomException(404, "Action not defined");

	}

	public String doDelete(Map<String, String> parameters) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public JSONObject toStartRide(String otp, int rideId) throws ClassNotFoundException, SQLException, CustomException {
		JSONObject message = new JSONObject();
		if (getOtp(rideId).equals(otp)) {
			int status = new RideDao().toStartRide(rideId);
			if (status == 1) {
				message.put("message", "successfully accepted the ride");
			} else {
				throw new CustomException(404, "Ride not found");
			}
		} else {
			throw new CustomException(400, "invalid Otp");
		}
		return message;
	}

	public JSONObject toCompleteRide(int rideId, int cabId)
			throws ClassNotFoundException, SQLException, CustomException {
		JSONObject message = new JSONObject();
		if (toGetDriverRideStatus(cabId, Enums.RideStatus.Started.getCode())) {
			int status = new RideDao().toCompleteRide(rideId);
			if (status == 1) {
				new CabHandler().updateCabStatus(cabId, Enums.CabStatus.Available.getCode());
				new CabHandler().updateCabLocation(cabId, getEndlocationOfRide(rideId));
				message.put("message", "successfully completed the ride");
			} else {
				throw new CustomException(404, "Ride not found");
			}
		} else {
			message.put("message", "Booking not available");
		}
		return message;
	}

	public JSONObject toGetRideinProgress(int cabId) throws ClassNotFoundException, SQLException, CustomException {

		int status = -1;
		if (toGetDriverRideStatus(cabId, 3)) {
			status = 3;
		} else if (toGetDriverRideStatus(cabId, 6)) {
			status = 6;
		}
		if (status != -1) {
			JSONArray driverCurrentRide = new RideDao().getCurrentBookingsForDriver(cabId, status);
			JSONObject rideDetails = driverCurrentRide.getJSONObject(0);
			int currentStatus = rideDetails.getInt("status");
			rideDetails.remove("status");
			rideDetails.put("status", Enums.RideStatus.getNameByValue(currentStatus));
			return rideDetails;
		}
		throw new CustomException(404, " No current rides are available ");
	}

	public JSONObject toAcceptRide(int rideId, int cabId)
			throws ClassNotFoundException, JSONException, SQLException, CustomException {
		JSONObject message = new JSONObject();
		int status = new CabHandler().getCabStatus(cabId);

		if (status != Enums.CabStatus.Available.getCode()) {
			message.put("message",
					"Unable to accept the ride. Your cab is currently" + Enums.CabStatus.getDescriptionByCode(status));
		} else {
			if (getRideStatus(rideId) == Enums.RideStatus.Waiting.getCode()) {
				int acceptStatus = new RideDao().toAcceptRide(rideId);
				if (acceptStatus == 1) {
					new CabHandler().updateCabStatus(cabId, 3);
					message.put("message", "successfully accepted the ride");

				} else {
					throw new CustomException(404, "Ride not found");
				}
			} else {
				message.put("message", "The ride is currently unavailable");
			}
		}
		return message;
	}

	public JSONArray toGetUserRides(int userId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray rideDetails = new JSONArray();
		rideDetails = new RideDao().getUserRideDetails(userId);
		if (rideDetails.isEmpty() || rideDetails.length() == 0) {
			throw new CustomException(404, "Users Ride history is not found");
		}
		rideDetails = toReplaceStatusbyName(rideDetails);
		return rideDetails;
	}

	public JSONArray GetAvailableBookingsForDriver(int cabId)
			throws ClassNotFoundException, SQLException, CustomException {

		JSONArray availableBookings = new RideDao().getAvailableBookingsForDriver(cabId);

		if (availableBookings.isEmpty()) {
			throw new CustomException(404, " No ride requests available");
		}
		return availableBookings;
	}

	public int GetAvailableBookingsCountForDriver(int cabId)
			throws ClassNotFoundException, SQLException, CustomException {
		JSONArray availableBookings = new RideDao().getAvailableBookingsForDriver(cabId);
		return availableBookings.length();
	}

	public JSONObject disableReportButtonForUser(int rideId)
			throws ClassNotFoundException, SQLException, CustomException {
		int reportStatus = new RideDao().getReportStatus(rideId).getJSONObject(0).getInt("report");
		int report = (reportStatus == 1) ? 2 : 4;
		int status = new RideDao().disableReportButtonForUser(rideId, report);
		if (status == 1) {
			return new JSONObject().put("message", "report button disabled for user successfully");
		}
		throw new CustomException(404, "Ride not found");
	}

	public JSONObject disableReportButtonForDriver(int rideId)
			throws ClassNotFoundException, SQLException, CustomException {
		int reportStatus = new RideDao().getReportStatus(rideId).getJSONObject(0).getInt("report");
		int report = (reportStatus == 1) ? 3 : 4;
		int status = new RideDao().disableReportButtonForUser(rideId, report);
		if (status == 1) {
			return new JSONObject().put("message", "report button disabled for driver successfully");
		}
		throw new CustomException(404, "Ride not found");
	}

	public JSONArray toGetRidesForCompany(int companyId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray rideHistory = new RideDao().getCompanyRideDetails(companyId);
		if (rideHistory.isEmpty()) {
			throw new CustomException(404, "Ride History is Empty");
		}
		return rideHistory;
	}

	public JSONObject toGetCurrentBookingForUser(int userId)
			throws ClassNotFoundException, SQLException, CustomException {
		int status = -1;
		if (toGetUserRideStatus(userId, Enums.RideStatus.Waiting.getCode())) {
			status = Enums.RideStatus.Waiting.getCode();
		} else if (toGetUserRideStatus(userId, Enums.RideStatus.Accepted.getCode())) {
			status = Enums.RideStatus.Accepted.getCode();

		} else if (toGetUserRideStatus(userId, Enums.RideStatus.Started.getCode())) {
			status = Enums.RideStatus.Started.getCode();
		}
		if (status != -1) {
			JSONArray currentBookings = new RideDao().getCurrentBookingsForUser(userId, status);
			if (currentBookings.isEmpty() || currentBookings.getJSONObject(0).isEmpty()) {
				throw new CustomException(404, "No bookings currently available");
			}
			JSONObject booking = currentBookings.getJSONObject(0);
			int state = booking.getInt("status");
			int cabId = booking.getInt("cab_id");
			int modelId = new CabHandler().getCabModelId(cabId);
			String model = Enums.CarType.getNameByValue(modelId);
			booking.remove("cab_id");
			booking.remove("status");
			booking.put("state", Enums.RideStatus.getNameByValue(state));
			booking.put("model", model);
			return booking;
		}
		throw new CustomException(404, "No bookings currently available");
	}

	public JSONObject toCancelRide(int userId, int rideId)
			throws ClassNotFoundException, SQLException, CustomException {
		JSONObject responseMessage = new JSONObject();
		int status = getRideStatus(rideId);
		if (status == Enums.RideStatus.Waiting.getCode()) {
			new RideDao().toCancelRide(rideId);
			responseMessage.put("message", "successfully cancelled the ride");
		} else if (status == Enums.RideStatus.Rejected.getCode()) {
			responseMessage.put("message", "Already ride rejected so unable to cancel the ride");
		} else if (toGetUserRideStatus(userId, Enums.RideStatus.Accepted.getCode())) {
			responseMessage.put("message", "Already ride accepted so unable to cancel the ride");
		} else {
			responseMessage.put("message", "Ride is not currenty avalable...");
		}
		return responseMessage;
	}

	public JSONObject toRejectRide(int rideId)
			throws ClassNotFoundException, JSONException, SQLException, CustomException {

		JSONObject rideDetails = new JSONObject();
		int rideStatus = getRideStatus(rideId);
		if (rideStatus == Enums.RideStatus.Waiting.getCode()) {
			int flag = new RideDao().toRejectRide(rideId);
			if (flag == 1) {
				rideDetails.put("message", "successfully rejected the ride");
			} else {
				throw new CustomException(404, "Ride not found");
			}
		} else {
			rideDetails.put("message", "Ride is not currenty avalable");
		}
		return rideDetails;
	}

	public boolean toGetDriverRideStatus(int cabId, int status) throws ClassNotFoundException, SQLException {

		resultArray = new RideDao().toGetDriverRideStatus(cabId, status);
		if (resultArray.isEmpty()) {
			return false;
		}
		return true;
	}

	public boolean toGetUserRideStatus(int userId, int status) throws ClassNotFoundException, SQLException {

		JSONArray userRideStatus = new RideDao().toGetUserRideStatus(userId, status);
		if (userRideStatus.isEmpty() || userRideStatus.getJSONObject(0).isEmpty()) {
			return false;
		}
		return true;
	}

	public int toGetCurrentRideCabId(int userId, int status) throws ClassNotFoundException, SQLException {

		JSONArray userRideStatus = new RideDao().toGetCurrentRideCabId(userId, status);
		if (userRideStatus.isEmpty() || userRideStatus.getJSONObject(0).isEmpty()) {
			return -1;
		}
		return userRideStatus.getJSONObject(0).getInt("cab_id");
	}

	public int getRideStatus(int rideId) throws ClassNotFoundException, SQLException, CustomException {

		JSONArray rideStatus = new RideDao().getRideStatus(rideId);
		if (rideStatus.isEmpty()) {
			throw new CustomException(404, "Ride not found");
		}
		return rideStatus.getJSONObject(0).getInt("status");
	}

	public int getEndlocationOfRide(int rideId) throws ClassNotFoundException, SQLException, CustomException {
		int endLocationId = -1;
		resultArray = new RideDao().getEndLocationOfRide(rideId);
		if (resultArray.isEmpty()) {
			throw new CustomException(404, "location not found");
		} else {
			endLocationId = resultArray.getJSONObject(0).getInt("endlocation_id");
		}
		return endLocationId;
	}

	public String getOtp(int rideId) throws ClassNotFoundException, SQLException, CustomException {

		resultArray = new RideDao().getOtp(rideId);
		String Otp = "";
		if (resultArray.isEmpty()) {
			throw new CustomException(404, "Otp not found");
		} else {
			Otp = resultArray.getJSONObject(0).getString("otp");
		}
		return Otp;
	}

	public int driverWeeklyEarnings(int cabId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray weeklyEarnings = new RideDao().weeklyEarningsOfDriver(cabId);
		if (weeklyEarnings.isEmpty()) {
			return 0;
		}
		return toGetTotalFare(weeklyEarnings);
	}

	public int toGetTotalFare(JSONArray fares) {
		int weeklyEarning = 0;
		for (int i = 0; i < fares.length(); i++) {
			JSONObject json = fares.getJSONObject(i);
			weeklyEarning += json.getInt("fare");
		}
		return weeklyEarning;
	}

	public JSONArray toReplaceStatusbyName(JSONArray rides) {
		JSONArray updatedRides = new JSONArray();
		for (int i = 0; i < rides.length(); i++) {
			JSONObject details = rides.getJSONObject(i);
			int status = details.getInt("status");
			String start_at = "";
			String end_at = "";
			if (details.getLong("start_at") != 0) {
				start_at = Helper.convertMillisToDateTime(details.getLong("start_at"));
			}
			if (details.getLong("end_at") != 0) {
				end_at = Helper.convertMillisToDateTime(details.getLong("end_at"));
			}
			details.remove("status");
			details.remove("start_at");
			details.remove("end_at");
			details.put("status", Enums.RideStatus.getNameByValue(status));
			
			details.put("start_at", start_at);
			details.put("end_at", end_at);
			if(status==Enums.RideStatus.Cancelled.getCode() || status==Enums.RideStatus.Completed.getCode()
					||status==Enums.RideStatus.Rejected.getCode()) {
				updatedRides.put(details);
			}
		}
		return updatedRides;
	}

	public int getRideCustomerId(int rideId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray rideDetails = new RideDao().getRideCustomerId(rideId);
		if (rideDetails.isEmpty() || rideDetails.getJSONObject(0).isEmpty()) {
			throw new CustomException(400,"Ride is not found");
		}
		if (rideDetails.getJSONObject(0).has("user_report_message")
				&& !rideDetails.getJSONObject(0).getString("user_report_message").isEmpty()) {
			throw new CustomException(400, "Already reported");
		}

		return rideDetails.getJSONObject(0).getInt("customer_id");
	}

	public int getRideCabId(int rideId) throws ClassNotFoundException, SQLException, CustomException {
		JSONArray rideDetails = new RideDao().getRideCabId(rideId);
		if (rideDetails.isEmpty() || rideDetails.getJSONObject(0).isEmpty()) {
			throw new CustomException(400,"Ride is not found");
		}
		if (rideDetails.getJSONObject(0).has("driver_report_message")
				&& !rideDetails.getJSONObject(0).getString("driver_report_message").isEmpty()) {
			throw new CustomException(400, "Already reported");
		}
		return rideDetails.getJSONObject(0).getInt("cab_id");
	}
	
	public int getReportCountForUser(int userId) throws ClassNotFoundException, SQLException
	{
		JSONArray rideDetails = new RideDao().getReportCountForUser(userId);
		if (rideDetails.isEmpty()) {
			return 0;
		}
		return rideDetails.length();
	}
	
	public int getReportCountForDriver(int cabId) throws ClassNotFoundException, SQLException
	{
		JSONArray rideDetails = new RideDao().getReportCountForDriver(cabId);
		if (rideDetails.isEmpty()) {
			return 0;
		}
		return rideDetails.length();
	}

}