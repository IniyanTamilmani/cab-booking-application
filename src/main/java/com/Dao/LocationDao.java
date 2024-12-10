package com.Dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONArray;

import com.databaseOperations.QueryExecutor;
import com.databaseOperations.QueryGenerator;
import com.enums.Enums;
//import com.utils.Enums.Operators;

public class LocationDao {

    // To get all the location details
    public JSONArray getAllLocations() throws SQLException, ClassNotFoundException {
        String query = new QueryGenerator().selectMethod("locations", "*").build();
        return new QueryExecutor().executeSelectOperation(query, null);
    }

    // To get location ID by name
    public JSONArray getLocationId(String locationName) throws SQLException, ClassNotFoundException {
        String query = new QueryGenerator()
            .selectMethod("locations", "location_id")
            .whereHelper(new String[] { "name" }, 
                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                         null)
            .build();
        return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(locationName)));
    }

    // To get coordinates by location name
    public JSONArray getLocationCoordinates(String locationName) throws SQLException, ClassNotFoundException {
        String query = new QueryGenerator()
            .selectMethod("locations", "latitude, longitude") 
            .whereHelper(new String[] { "name" }, 
                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                         null)
            .build();
        return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(locationName)));
    }

 
}
