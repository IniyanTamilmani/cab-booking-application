package com.Dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONArray;

import com.databaseOperations.QueryExecutor;
import com.databaseOperations.QueryGenerator;
import com.enums.Enums;
import com.utils.Helper;

//import com.utils.Enums.Operators;

public class RideDao {

	// to book a cab
	public JSONArray bookCab(ArrayList<Object> columValues) throws ClassNotFoundException, SQLException {

		String query = new QueryGenerator()
				.insertMethod("rides", "customer_id", "cab_id", "startlocation_id", "endlocation_id", "fare")
				.returnHelper("ride_id").build();

		JSONArray rs = new QueryExecutor().executeSelectOperation(query, columValues);
		return rs;

	}

	// to reject a ride
	public int toRejectRide(int rideId) throws ClassNotFoundException, SQLException {

		String query = new QueryGenerator().updateMethod("rides", "status", "modified_at")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(Enums.RideStatus.Rejected.getCode(), Helper.getCurrentTimeInMillis(), rideId)));

	}

	// to cancel a ride
	public int toCancelRide(int rideId) throws ClassNotFoundException, SQLException {

		String query = new QueryGenerator().updateMethod("rides", "status", "modified_at")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeUpdateOperation(query, new ArrayList<>(
				Arrays.asList(Enums.RideStatus.Cancelled.getCode(), Helper.getCurrentTimeInMillis(), rideId)));

	}



	public int toStartRide(int rideId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().updateMethod("rides", "status", "start_at", "modified_at")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(Enums.RideStatus.Started.getCode(), Helper.getCurrentTimeInMillis(),
						Helper.getCurrentTimeInMillis(), rideId)));
	}

	// to complete a cab
	public int toCompleteRide(int rideId) throws ClassNotFoundException, SQLException {
		// to complete the ride
		String query = new QueryGenerator().updateMethod("rides", "status", "end_at", "modified_at")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeUpdateOperation(query, new ArrayList<>(
				Arrays.asList(4, Helper.getCurrentTimeInMillis(), Helper.getCurrentTimeInMillis(), rideId)));
	}

	// to start a ride
	public int toAcceptRide(int rideId) throws ClassNotFoundException, SQLException {

		String query = new QueryGenerator().updateMethod("rides", "status", "otp", "modified_at")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(3, Helper.generateOTP(), Helper.getCurrentTimeInMillis(), rideId)));
	}

	public JSONArray toGetDriverRideStatus(int cabId, int status) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "cab_id")
				.whereHelper(new String[] { "cab_id", "status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId, status)));
	}

//	to get user ride status
	public JSONArray toGetUserRideStatus(int userId, int status) throws ClassNotFoundException, SQLException {
		// status
		String query = new QueryGenerator().selectMethod("rides", "status")
				.whereHelper(new String[] { "customer_id", "status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId, status)));
	}

	public JSONArray toGetCurrentRideCabId(int userId, int status) throws ClassNotFoundException, SQLException {
		// status
		String query = new QueryGenerator().selectMethod("rides", "cab_id")
				.whereHelper(new String[] { "customer_id", "status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId, status)));
	}

	// to get the ride details of a user
	public JSONArray getUserRideDetails(int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("rides r", "r.ride_id", "l1.name AS startLocation", "l2.name AS endLocation", "c.name",
						"c.company_id", "dd.driver_id", "r.fare", "r.status", "r.start_at", "r.end_at", "r.cab_id",
						"r.user_report_message")
				.joinHelper("INNER",
						new String[] { "locations l1", "locations l2", "cabs cd", "drivers dd", "companies c" },
						new String[] { "r.startlocation_id", "r.endlocation_id", "r.cab_id", "cd.driver_id",
								"dd.company_id" },
						new String[] { "l1.location_id", "l2.location_id", "cd.cab_id", "dd.driver_id",
								"c.company_id" })
				.whereHelper(new String[] { "r.customer_id"}, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId)));
	}

	// to get ride details of driver or cab
	public JSONArray getCabRideDetails(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("rides r", "r.ride_id", "r.customer_id", "l1.name AS start_location",
						"l2.name AS end_location", "r.fare", "r.status", "u.name", "r.start_at", "r.end_at", "r.report",
						"r.driver_report_message")
				.joinHelper("INNER", new String[] { "locations l1", "locations l2", "users u" },
						new String[] { "r.startlocation_id", "r.endlocation_id", "u.user_id" },
						new String[] { "l1.location_id", "l2.location_id", "r.customer_id" })
				.whereHelper(new String[] { "r.cab_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId)));
	}

	// to get company ride details
	public JSONArray getCompanyRideDetails(int companyId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("rides r", "r.ride_id", "r.cab_id", "r.customer_id", "dd.driver_id",
						"u.name as CustomerName", "ud.name as DriverName", "l1.name AS startlocation",
						"l2.name AS endLocation", "r.fare", "r.status", "r.start_at", "r.end_at","r.user_report_message","r.driver_report_message")
				.joinHelper("INNER",
						new String[] { "users u", "cabs cd", "drivers dd", "users ud", "companies c", "locations l1",
								"locations l2" },
						new String[] { "u.user_id", "r.cab_id", "dd.driver_id", "ud.user_id", "dd.company_id",
								"r.startlocation_id", "r.endlocation_id" },
						new String[] { "r.customer_id", "cd.cab_id", "cd.driver_id", "dd.driver_id", "c.company_id",
								"l1.location_id", "l2.location_id" })
				.whereHelper(new String[] { "c.company_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId)));
	}

	public JSONArray getRideStatus(int rideId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "status") // Table name followed by the columns
				.whereHelper(new String[] { "ride_id" }, // Column names
						new String[] { Enums.Operators.EQUALTO.getSymbol() }, // Enums.Operators
						null // No additional conditions
				).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(rideId)));
	}

	public JSONArray getReportStatus(int rideId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "report") // Table name followed by the columns
				.whereHelper(new String[] { "ride_id" }, // Column names
						new String[] { Enums.Operators.EQUALTO.getSymbol() }, // Enums.Operators
						null // No additional conditions
				).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(rideId)));
	}

	public JSONArray getCurrentBookingsForDriver(int cabId, int status) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("rides r", "r.ride_id", "r.fare", "r.status", "sl.name AS start_location",
						"el.name AS end_location", "u.name", "u.phone_number")
				.joinHelper("INNER", new String[] { "locations sl", "locations el", "users u" },
						new String[] { "r.startlocation_id", "r.endlocation_id", "u.user_id" },
						new String[] { "sl.location_id", "el.location_id", "r.customer_id" })
				.whereHelper(new String[] { "cab_id", "r.status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId, status)));
	}

	public JSONArray getRideStatusForUser(int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "ride_id").whereHelper(
				new String[] { "customer_id", "status" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId, 1)));
	}

	public JSONArray getAvailableBookingsForDriver(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("rides r", "r.ride_id", "u.name", "l1.name AS start_location", "l2.name AS end_location",
						"r.fare", "r.created_at")
				.joinHelper("INNER", new String[] { "users u", "locations l1", "locations l2" },
						new String[] { "r.customer_id", "r.startlocation_id", "r.endlocation_id" },
						new String[] { "u.user_id", "l1.location_id", "l2.location_id" })
				.whereHelper(new String[] { "cab_id", "r.status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId, 1)));
	}

	public JSONArray getCurrentBookingsForUser(int rideId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("rides r", "r.ride_id", "r.fare", "r.cab_id", "r.status", "sl.name AS start_location",
						"el.name AS end_location", "cd.register_number", "c.name", "r.otp")
				.joinHelper("INNER",
						new String[] { "cabs cd", "drivers dd", "companies c", "locations sl", "locations el" },
						new String[] { "r.cab_id", "cd.driver_id", "dd.company_id", "r.startlocation_id",
								"r.endlocation_id" },
						new String[] { "cd.cab_id", "dd.driver_id", "c.company_id", "sl.location_id",
								"el.location_id" })
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(rideId)));
	}

	public JSONArray getCurrentBookingsForUser(int userId, int status) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("rides r", "r.fare", "r.cab_id", "r.status", "r.ride_id", "sl.name AS start_location",
						"el.name AS end_location", "cd.register_number", "c.name", "r.otp")
				.joinHelper("INNER",
						new String[] { "cabs cd", "drivers dd", "companies c", "locations sl", "locations el" },
						new String[] { "r.cab_id", "cd.driver_id", "dd.company_id", "r.startlocation_id",
								"r.endlocation_id" },
						new String[] { "cd.cab_id", "dd.driver_id", "c.company_id", "sl.location_id",
								"el.location_id" })
				.whereHelper(new String[] { "customer_id", "r.status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId, status)));

	}

	public JSONArray getEndLocationOfRide(int rideId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "endlocation_id")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(rideId)));
	}

	public JSONArray getOtp(int rideId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "otp")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(rideId)));

	}

	public JSONArray weeklyEarningsOfDriver(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "fare")
				.whereHelper(new String[] { "cab_id", "status", "created_at" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol(),
								Enums.Operators.GREATERTHANOREQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol(), Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query,
				new ArrayList<>(Arrays.asList(cabId, 4, Helper.getStartOfWeekEpochMillis())));

	}

	public int disableReportButtonForUser(int rideId, int report) throws ClassNotFoundException, SQLException {

		String query = new QueryGenerator().updateMethod("rides", "report", "modified_at")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(report, Helper.getCurrentTimeInMillis(), rideId)));
	}

	public int toRejectOtherRides(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().updateMethod("rides", "status", "modified_at")
				.whereHelper(new String[] { "cab_id", "status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();
		return new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(Enums.RideStatus.Rejected.getCode(), Helper.getCurrentTimeInMillis(),
						cabId, Enums.RideStatus.Waiting.getCode())));
	}

	public int reportDriver(int rideId, String message) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().updateMethod("rides", "user_report_message", "modified_at")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();
		return new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(message, Helper.getCurrentTimeInMillis(), rideId)));
	}

	public int reportUser(int rideId, String message) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().updateMethod("rides", "driver_report_message", "modified_at")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();
		return new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(message, Helper.getCurrentTimeInMillis(), rideId)));
	}

	public JSONArray getRideCustomerId(int rideId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "customer_id","user_report_message")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(rideId)));
	}
	
	public JSONArray getRideCabId(int rideId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "cab_id","driver_report_message")
				.whereHelper(new String[] { "ride_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(rideId)));
	}

	public JSONArray getReportCountForUser(int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "driver_report_message")
				.whereHelper(new String[] { "customer_id","driver_report_message" }, new String[] { Enums.Operators.EQUALTO.getSymbol(),Enums.Operators.NOTEQUALTO.getSymbol() }, 
						new String[] { Enums.Operators.AND.getSymbol() }).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId,"")));
	}

	public JSONArray getReportCountForDriver(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("rides", "user_report_message")
				.whereHelper(new String[] { "cab_id","user_report_message" }, new String[] { Enums.Operators.EQUALTO.getSymbol(),Enums.Operators.NOTEQUALTO.getSymbol() }, 
						new String[] { Enums.Operators.AND.getSymbol() }).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId,"")));
	}

}
