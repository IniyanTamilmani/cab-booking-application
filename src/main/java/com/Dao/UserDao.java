package com.Dao;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONArray;

import com.databaseOperations.QueryExecutor;
import com.databaseOperations.QueryGenerator;
import com.enums.Enums;


public class UserDao 
{
	
	
	//to add new user
	public JSONArray userSignUp(ArrayList<Object> columnValues) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .insertMethod("users", new String[]{"name", "phone_number", "email", "password", "address"})
			    .returnHelper(new String[]{"user_id"})
			    .build();
		return  new QueryExecutor().executeSelectOperation( query, columnValues );

	}
	
	public  JSONArray toCheckMail(  String email) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .selectMethod("users", "user_id")
			    .whereHelper(new String[]{"email"}, 
			        new String[]{Enums.Operators.EQUALTO.getSymbol()}, 
			        null)
			    .build();

		return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(email)) );

	}
	
	public  JSONArray toCheckPhoneNumber(  String phoneNumber) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .selectMethod("users", "user_id")
			    .whereHelper(new String[]{"phone_number"}, 
			        new String[]{Enums.Operators.EQUALTO.getSymbol()}, 
			        null)
			    .build();

		return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(phoneNumber)));
	}
	
	// for login purpose
	public JSONArray toValidateUser( String phoneNumber) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .selectMethod("users", "user_id", "password","email")
			    .whereHelper(new String[]{"phone_number"}, new String[]{Enums.Operators.EQUALTO.getSymbol()}, null)
			    .build();

		return new QueryExecutor().executeSelectOperation(query,new ArrayList<>(Arrays.asList(phoneNumber)) );
		
	}
	
	public JSONArray toValidatePassword(  int userId,String oldPassword) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .selectMethod("users", "password")
			    .whereHelper(new String[]{"user_id"}, 
			        new String[]{Enums.Operators.EQUALTO.getSymbol()}, 
			        null)
			    .build();

		return new QueryExecutor().executeSelectOperation( query,new ArrayList<>(Arrays.asList(userId)) );

	}
	
	//to get details for individual
	public  JSONArray getUserDetails(  int userId) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .selectMethod("users", "user_id", "name", "phone_number", "email", "Address")
			    .whereHelper(new String[]{"user_id"}, 
			        new String[]{Enums.Operators.EQUALTO.getSymbol()}, 
			        null)
			    .build();

		return  new QueryExecutor().executeSelectOperation(query,new ArrayList<>(Arrays.asList(userId)) );
	}
	
	public  JSONArray getDriverDetails(  int userId) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .selectMethod("users u", "user_id", "u.name as userName", "phone_number", "email", "Address","c.name as CompanyName","dd.license_number","dd.status as driverStatus","cd.status as cabStatus","cd.register_number")
			    .joinHelper("INNER", new String[]{"drivers dd","companies c","cabs cd"}, 
				        new String[]{"u.user_id","c.company_id","cd.driver_id"}, 
				        new String[]{"dd.driver_id","dd.company_id","dd.driver_id"})
				.whereHelper(new String[]{"u.user_id"}, 
				        new String[]{Enums.Operators.EQUALTO.getSymbol()}, 
				        null)
			    .build();

		return  new QueryExecutor().executeSelectOperation(query,new ArrayList<>(Arrays.asList(userId)) );
	}
	
	public  JSONArray getAdminDetails(  int userId) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .selectMethod("users u", "user_id", "u.name as userName", "phone_number", "email", "Address","c.name as CompanyName","c.status")
			    .joinHelper("INNER", new String[]{"companies c"}, 
				        new String[]{"u.user_id"}, 
				        new String[]{"c.admin_id"})
				.whereHelper(new String[]{"u.user_id"}, 
				        new String[]{Enums.Operators.EQUALTO.getSymbol()}, 
				        null)
			    .build();
		return  new QueryExecutor().executeSelectOperation(query,new ArrayList<>(Arrays.asList(userId)) );
	}
	
	
	//to get details of all users  
	public JSONArray getUserDetailsForCompany( int companyId) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator()
			    .selectMethod("users u", "u.user_id", "u.name as username", "u.email", "u.phone_number", "u.address", "us.report_count","us.status_id","us.status", "c.name as companyname")
			    .joinHelper("INNER", new String[]{"status us", "companies c"}, 
			        new String[]{"u.user_id", "us.company_id"}, 
			        new String[]{"us.user_id", "c.company_id"})
			    .whereHelper(new String[]{"c.company_id"}, 
			        new String[]{Enums.Operators.EQUALTO.getSymbol()}, 
			        null)
			    .build();

		return  new QueryExecutor().executeSelectOperation(query,new ArrayList<>(Arrays.asList(companyId)) );

	}
	
	public JSONArray getUsers(int companyId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("users u", "u.user_id", "u.name as username", "u.email", "u.phone_number", "u.address",
						"(b.user_id IS NOT NULL) AS is_blocked")
				.joinWithAndHelper("LEFT OUTER", new String[] { "block_lists b" }, new String[] { "u.user_id" },
						new String[] { "b.user_id" },new String[] {"b.company_id"})
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId)));
	}

	public JSONArray checkUserPresentOrNot(int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
			    .selectMethod("users", "1")
			    .whereHelper(new String[]{"user_id"}, 
			        new String[]{Enums.Operators.EQUALTO.getSymbol()}, 
			        null)
			    .build();

		return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId)));
	}
	
	
}
