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

public class CompanyDao {
	
	public int acceptRequestApproval(int companyId) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator().updateMethod("companies", "status", "modified_at")
				.whereHelper(new String[] { "company_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null).build();
		return new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(Enums.CompanyStatus.Admin.getCode(), Helper.getCurrentTimeInMillis(),companyId)));
	}
    
    public JSONArray getCompanyNameById(int companyId) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
            .selectMethod("companies", "name")
            .whereHelper(new String[] { "company_id" }, 
                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                         null)
            .build();
        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId)));
    }
    
    public JSONArray availableCompanies() throws ClassNotFoundException, SQLException
    {
    	String query = new QueryGenerator()
                .selectMethod("companies", "name","description","started_year","company_id")
                .whereHelper(new String[] { "status" }, 
                             new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                             null)
                .build();
            return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(Enums.CompanyStatus.Admin.getCode())));
    }
    
    public JSONArray getCompanyIdByName(String companyName) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
            .selectMethod("companies", "company_id")
            .whereHelper(new String[] { "name" }, 
                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                         null)
            .build();
        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyName)));
    }
    
    public JSONArray checkCompanyNameisPresentOrNot(String companyName) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
            .selectMethod("companies", "1")
            .whereHelper(new String[] { "name" }, 
                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                         null)
            .build();
        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyName)));
    }
    
    public JSONArray getCompanyIds() throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
            .selectMethod("companies", "company_id")
            .build();
        return  new QueryExecutor().executeSelectOperation(query,null);
    }
    
    public JSONArray toCheckUserRole(int userId) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
            .selectMethod("companies", "company_id")
            .whereHelper(new String[] { "admin_id" }, 
                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                         null)
            .build();
        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId)));
    }
    
    public JSONArray getAdminId(int companyId) throws ClassNotFoundException, SQLException {
        String query = new QueryGenerator()
            .selectMethod("companies", "admin_id")
            .whereHelper(new String[] { "company_id" }, 
                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                         null)
            .build();
        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId)));
    }

	public JSONArray companyRegister(ArrayList<Object> columnValues) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
			    .insertMethod("companies", new String[]{"name", "started_year", "description", "admin_id"})
			    .returnHelper(new String[]{"company_id"})
			    .build();

		return  new QueryExecutor().executeSelectOperation( query, columnValues) ;
	}


	
	public int removeCompanyDetails(int companyId) throws ClassNotFoundException, SQLException
	{
		String query = new QueryGenerator().deleteMethod("companies")
				.whereHelper(new String[] { "company_id" }, new String[] { Enums.Operators.EQUALTO.getSymbol() }, null)
				.build();
				
		return (int) new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(companyId)));
	}

	public JSONArray pendingRequest() throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
	            .selectMethod("companies c","c.name as companyname","c.company_id","u.name as username","u.email","u.phone_number","u.address")
	            .joinHelper("INNER", new String[]{"users u"}, 
				        new String[]{"u.user_id"},
				        new String[]{"c.admin_id"})
	            .whereHelper(new String[] { "c.status" }, 
	                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
	                         null)
	            .build();
	        return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(Enums.CompanyStatus.User.getCode())));
	        
	}

	public JSONArray getCompanyStatus(int companyId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
	            .selectMethod("companies", "status")
	            .whereHelper(new String[] { "company_id" }, 
	                         new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
	                         null)
	            .build();
	   return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId)));
	}

	public JSONArray availableCompanyNames() throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
                .selectMethod("companies","name")
                .whereHelper(new String[] { "status" }, 
                             new String[] { Enums.Operators.EQUALTO.getSymbol() }, 
                             null)
                .build();
            return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(Enums.CompanyStatus.Admin.getCode())));
	}

	public JSONArray tocheckUserStatusInCompany(int companyId, int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
                .selectMethod("block_lists","1")
                .whereHelper(new String[] { "company_id","user_id" }, 
                             new String[] { Enums.Operators.EQUALTO.getSymbol(),Enums.Operators.EQUALTO.getSymbol() }, 
                             new String[] { Enums.Operators.AND.getSymbol() })
                .build();
       return  new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId,userId)));
	}
    
    
}
