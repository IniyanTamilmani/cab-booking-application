
package com.handler;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import com.utils.CustomException;
import com.Dao.*;

public class LocationHandler extends AbstractHandler {

	public String doGet(Map<String, String> parameters) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public String doPost(Map<String, String> parameters, JSONObject payload) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public String doPut(Map<String, String> parameters, JSONObject payload) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public String doDelete(Map<String, String> parameters) throws CustomException {
		throw new CustomException(404, "Method not declared");
	}

	public ArrayList<Double> getLocationCoOrdinates(String location)
			throws CustomException, ClassNotFoundException, SQLException {
		ArrayList<Double> coOrdinates = new ArrayList<>();
		JSONArray locationDetails = new LocationDao().getLocationCoordinates(location);

		if (locationDetails.isEmpty() || locationDetails.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "LocationCoordinates not found");
		}
		
		JSONObject locationCoordinates =locationDetails.getJSONObject(0);
		double latitude = locationCoordinates.getDouble("latitude");
		double longitude = locationCoordinates.getDouble("longitude");
		coOrdinates.add(latitude);
		coOrdinates.add(longitude);
		return coOrdinates;
	}

	public Set<Integer> getNearByLocations(double startlatitude, double startlongitude)
			throws ClassNotFoundException, SQLException, CustomException {
		Set<Integer> nearbyLocations = new HashSet<>();
		JSONArray allLocations = new LocationDao().getAllLocations();
		if (allLocations.isEmpty() || allLocations.getJSONObject(0).isEmpty()) {
			throw new CustomException(404, "No Locations found");
		}
		for (int i = 0; i < allLocations.length(); i++) {
			double nearbyLocationlatitude = allLocations.getJSONObject(i).getDouble("latitude");
			double nearbyLocationlongitude = allLocations.getJSONObject(i).getDouble("longitude");
			double res = distanceFinder(startlatitude, startlongitude, nearbyLocationlatitude, nearbyLocationlongitude);
			if (res <= 5.0) {
				nearbyLocations.add(allLocations.getJSONObject(i).getInt("location_id"));
			}
		}
		return nearbyLocations;
	}

	public int getLocationId(String locationName) throws CustomException, ClassNotFoundException, SQLException {
		JSONArray locationId = new LocationDao().getLocationId(locationName);
		if (locationId.isEmpty() || locationId.getJSONObject(0).isEmpty()) {
			return -1;
		}
		return locationId.getJSONObject(0).getInt("location_id");
	}

	public double distanceFinder(double lat1, double lon1, double lat2, double lon2) {

		// Convert latitude and longitude from degrees to radians
		double dLat = Math.toRadians(lat2 - lat1);
		double dLon = Math.toRadians(lon2 - lon1);

		// Apply the Haversine formula
		lat1 = Math.toRadians(lat1);
		lat2 = Math.toRadians(lat2);

		double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
				+ Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		// Distance in kilometers
		return 6371.0 * c;
	}

}
