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

public class DriverDao {
	// to add driver details --
	public int upgradeToDriver(ArrayList<Object> driverDetails) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.insertMethod("drivers", new String[] { "driver_id", "license_number", "company_id" }).build();

		return (int) new QueryExecutor().executeUpdateOperation(query, driverDetails);
	}

	// to update driver status --
	public int updateDriverStatus(int driverId, int userStatus) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().updateMethod("drivers", new String[] { "status", "modified_at" })
				.whereHelper(new String[] { "driver_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return (int) new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(userStatus, Helper.getCurrentTimeInMillis(), driverId)));
	}

	// to get driver details for specific company --
	public JSONArray getDriverDetails(int companyId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("users u",
						new String[] { "user_id","name", "phone_number", "email","address", "license_number", "dd.status",
								"cab_type_id", "register_number","cd.cab_id" })
				.joinHelper("INNER", new String[] { "drivers dd", "cabs cd" },
						new String[] { "u.user_id", "dd.driver_id" }, new String[] { "dd.driver_id", "cd.driver_id" })
				.whereHelper(new String[] { "company_id", "dd.status","dd.status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol(),Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol(),Enums.Operators.OR.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId,Enums.DriverStatus.Approved.getCode(),
				Enums.DriverStatus.Blocked.getCode())));

	}

	// to get driver details for each individual in specific company--
	public JSONArray getDriverDetails(int companyId, int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("users u",
						new String[] { "name", "phone_number", "address", "license_number", "status",
								"cab_type_id", "register_number" })
				.joinHelper("INNER", new String[] { "drivers dd", "cabs cd" },
						new String[] { "u.user_id", "dd.driver_id" }, new String[] { "dd.driver_id", "cd.driver_id" })
				.whereHelper(new String[] { "company_id", "user_id" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId, userId)));

	}

	//
	public JSONArray getDriverDetailsForUser(int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("users u", "name", "phone_number", "address", "license_number", "status",
						"cab_type_id", "register_number")
				.joinHelper("INNER", new String[] { "drivers dd", "cabs cd" },
						new String[] { "u.user_id", "dd.driver_id" }, new String[] { "dd.driver_id", "cd.driver_id" })
				.whereHelper(new String[] { "user_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId)));

	}

	// to get driver requests
	public JSONArray getDriverRequests(int companyId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("users u", "u.user_id", "u.name", "u.phone_number", "u.email", "u.address",
						"dd.license_number", "cd.register_number", "cd.cab_type_id")
				.joinHelper("INNER", new String[] { "drivers dd", "cabs cd" },
						new String[] { "u.user_id", "dd.driver_id" }, new String[] { "dd.driver_id", "cd.driver_id" })
				.whereHelper(new String[] { "dd.company_id", "dd.status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId, Enums.DriverStatus.Pending.getCode())));

	}

	// to get driver companyId
	public JSONArray toFindRole(int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("drivers dd", "company_id","cd.cab_id","dd.status")
				.joinHelper("INNER", new String[] { "cabs cd" },
						new String[] { "cd.driver_id" }, new String[] { "dd.driver_id"})
				.whereHelper(new String[] { "dd.driver_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId)));

	}

	public JSONArray toCheckUserRole(int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("users u", new String[] { "u.user_id" })
				.joinHelper("INNER", new String[] { "drivers dd" }, new String[] { "u.user_id" },
						new String[] { "dd.driver_id" })
				.whereHelper(new String[] { "u.user_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId)));
	}
	
	public int cancelRequest(int driverId) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator().deleteMethod("drivers")
				.whereHelper(new String[] { "driver_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
		return (int) new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(driverId)));
	}
	
	public JSONArray checkLicenseNumberIsPresentOrNot(String LicenseNumber) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator().selectMethod("drivers", "1" )
				.whereHelper(new String[] { "license_number" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(LicenseNumber)));
	}

	public JSONArray getDriverStatus(int driverId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("drivers", "status" )
				.whereHelper(new String[] { "driver_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(driverId)));
	}

	public JSONArray getDriverCompanyId(int driverId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("drivers", "company_id" )
				.whereHelper(new String[] { "driver_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(driverId)));
	}
	
	public JSONArray checkDriverIsPresentOrNot(int driverId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("drivers", "1" )
				.whereHelper(new String[] { "driver_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(driverId)));
	}

}
