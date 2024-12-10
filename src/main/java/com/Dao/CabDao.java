package com.Dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONArray;

import com.databaseOperations.JdbcConnector;
import com.databaseOperations.QueryExecutor;
import com.databaseOperations.QueryGenerator;
import com.enums.Enums;
//import com.utils.Enums.Operators;

public class CabDao {
	// to add driver's cabDetails
	public int addCabDetailsForDriver(ArrayList<Object> cabDetails) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.insertMethod("cabs", "cab_type_id", "register_number", "driver_id", "status").build();
		return (int) new QueryExecutor().executeUpdateOperation(query, cabDetails);
	}

	// to update cab status
	public int updateCabStatus(int cabId, int status) throws ClassNotFoundException, SQLException { // 3 -> riding
		String query = new QueryGenerator().updateMethod("cabs", "status")
				.whereHelper(new String[] { "cab_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
		return (int) new QueryExecutor().executeUpdateOperation(query, new ArrayList<>(Arrays.asList(status, cabId)));
	}

	// to update cabLocation
	public int updateCabLocation(int cabId, int locationId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().updateMethod("cabs", "currentlocation_id")
				.whereHelper(new String[] { "cab_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
		return (int) new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(locationId, cabId)));
	}

	// to get available cabsId
	public JSONArray getNearByAvailableCabIds(int currentLocationId, int companyId)
			throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("cabs cd", "cd.cab_id")
				.joinHelper("INNER", new String[] { "drivers dd" }, new String[] { "cd.driver_id" },
						new String[] { "dd.driver_id" })
				.whereHelper(new String[] { "currentlocation_id", "company_id", "cd.status", "dd.status" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol(),
								Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol(), Enums.Operators.AND.getSymbol(),
								Enums.Operators.AND.getSymbol() })
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(currentLocationId,
				companyId, Enums.CabStatus.Available.getCode(), Enums.DriverStatus.Approved.getCode())));
	}

	// to get nearby available cab details
	public JSONArray getAvailableCabDetails(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("cabs cd", "c.name", "c.company_id", "cd.cab_type_id", "cd.driver_id", "cd.cab_id",
						"cd.register_number")
				.joinHelper("INNER", new String[] { "drivers dd", "companies c" },
						new String[] { "cd.driver_id", "dd.company_id" },
						new String[] { "dd.driver_id", "c.company_id" })
				.whereHelper(new String[] { "cab_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId)));
	}

	// to get cabId by using driverId
	public JSONArray getCabId(int driverId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("cabs", "cab_id")
				.whereHelper(new String[] { "driver_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(driverId)));
	}

	// to get modelId
	public JSONArray getModelId(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("cabs", "cab_type_id")
				.whereHelper(new String[] { "cab_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId)));
	}

	// to get cab status
	public JSONArray toGetCabStatus(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("cabs", "status")
				.whereHelper(new String[] { "cab_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId)));
	}

	public int cancelRequest(int driverId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().deleteMethod("cabs")
				.whereHelper(new String[] { "driver_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();

		return (int) new QueryExecutor().executeUpdateOperation(query, new ArrayList<>(Arrays.asList(driverId)));
	}

	// to check register number is already present or not
	public JSONArray checkRegisterNumberIsPresentOrNot(String RegisterNumber)
			throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("cabs", new String[] { "1" }).whereHelper(
				new String[] { "register_number" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(RegisterNumber)));
	}

	// to get cabId by using driverId
	public JSONArray getDriverId(int cabId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("cabs", "driver_id")
				.whereHelper(new String[] { "cab_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(cabId)));
	}

}
