package com.Dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONArray;

import com.databaseOperations.QueryExecutor;
import com.databaseOperations.QueryGenerator;
import com.enums.Enums;

public class BlockListDao {
	public int blockUser(ArrayList<Object> userDetails) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().insertMethod("block_lists", "user_id", "company_id").build();
		return (int) new QueryExecutor().executeUpdateOperation(query, userDetails);
	}

	public JSONArray getUsers(int companyId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator()
				.selectMethod("users u", "u.user_id", "u.name", "u.email", "u.phone_number", "u.address",
						"(b.user_id IS NOT NULL) AS is_blocked", "b.company_id")
				.joinWithAndHelper("LEFT OUTER", new String[] { "block_lists b" }, new String[] { "u.user_id" },
						new String[] { "b.user_id" }, new String[] { "b.company_id" })
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(companyId)));
	}

	public int unblockUser(int userId, int companyId) throws ClassNotFoundException, SQLException {

		String query = new QueryGenerator().deleteMethod("block_lists")
				.whereHelper(new String[] { "user_id", "company_id" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();
		return (int) new QueryExecutor().executeUpdateOperation(query,
				new ArrayList<>(Arrays.asList(userId, companyId)));
	}

	public JSONArray userAvailableCompanies(int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("companies c", "c.company_id")
				.joinWithAndHelper("LEFT", new String[] { "block_lists b" }, new String[] { "c.company_id" },
						new String[] { "b.company_id" }, new String[] { "b.user_id" })
				.whereHelper(new String[] { "b.user_id", "c.status" },
						new String[] { "IS NULL", Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();
		return new QueryExecutor().executeSelectOperation(query,
				new ArrayList<>(Arrays.asList(userId, Enums.CompanyStatus.Admin.getCode())));

	}

	public JSONArray checkUserBlockedOrNot(int companyId, int userId) throws ClassNotFoundException, SQLException {
		String query = new QueryGenerator().selectMethod("block_lists", "1")
				.whereHelper(new String[] { "user_id", "company_id" },
						new String[] { Enums.Operators.EQUALTO.getSymbol(), Enums.Operators.EQUALTO.getSymbol() },
						new String[] { Enums.Operators.AND.getSymbol() })
				.build();
		return new QueryExecutor().executeSelectOperation(query, new ArrayList<>(Arrays.asList(userId, companyId)));
	}

}
