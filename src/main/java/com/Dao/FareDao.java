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

public class FareDao {

    // To update cab fare for a specific model of a specific company
    public int updateFare(int companyId, int cabModelId, double fare) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
                .updateMethod("fares", "fare_per_km", "modified_at")
                .whereHelper(new String[]{"company_id", "cab_type_id"},
                        new String[]{Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol()},
                        new String[]{Enums.Operators.AND.getSymbol()})
                .build();

        return (int) new QueryExecutor().executeUpdateOperation(query, new ArrayList<>(Arrays.asList(fare, Helper.getCurrentTimeInMillis(), companyId, cabModelId)));
    }

    // To get the cab fare for a specific model of a specific company
    public JSONArray getFare(int companyId, int cabModelId) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
                .selectMethod("fares", "fare_per_km")
                .whereHelper(new String[]{"company_id", "cab_type_id"},
                        new String[]{Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol()},
                        new String[]{Enums.Operators.AND.getSymbol()})
                .build();
        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId, cabModelId)));
    }

    // Get cab fare by using cabId
    public JSONArray toGetCabFare(int companyId, int cabId) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
                .selectMethod("fares cf", "cf.fare_per_km")
                .joinHelper("INNER", new String[]{"cabs c"}, new String[]{"cf.cab_type_id"}, new String[]{"c.cab_model_id"})
                .whereHelper(new String[]{"cf.company_id"}, new String[]{Enums.Operators.EQUALTO.getSymbol()}, new String[]{Enums.Operators.AND.getSymbol()})
                .build();

        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId)));
    }
    
//    public int updateCabFare(Double fare,int fareId) throws ClassNotFoundException, SQLException {
//        String query = new QueryGenerator()
//                .updateMethod("fares", "fare_per_km")
//                .whereHelper(new String[]{"fare_id"}, new String[]{Enums.Operators.EQUALTO.getSymbol()},null)
//                .build();
//
//        return  new QueryExecutor().executeUpdateOperation(query, new ArrayList<>(Arrays.asList(fare,fareId)));
//    }
    
    public int updateCabFare(Double fare,int companyId,int cabModelId) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
                .updateMethod("fares", "fare_per_km")
                .whereHelper(new String[]{"company_id","cab_type_id"}, new String[]{Enums.Operators.EQUALTO.getSymbol(),Enums.Operators.EQUALTO.getSymbol()},
                		new String[]{Enums.Operators.AND.getSymbol()})
                .build();

        return  new QueryExecutor().executeUpdateOperation(query, new ArrayList<>(Arrays.asList(fare,companyId,cabModelId)));
    }
    
    public JSONArray fareDetails(int companyId) throws ClassNotFoundException, SQLException
    {
    	String query = new QueryGenerator()
                .selectMethod("fares", "fare_per_km","cab_type_id","fare_id")
                .whereHelper(new String[]{"company_id"}, new String[]{Enums.Operators.EQUALTO.getSymbol()},null)
                .build();

        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId)));
    }
    
    public int insertCabFare(int companyId,int cabTypeId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
			    .insertMethod("fares", new String[]{"company_id", "cab_type_id"})
			    .build();
		return  new QueryExecutor().executeUpdateOperation( query, new ArrayList<>(Arrays.asList(companyId,cabTypeId)) );

	}
    
}
