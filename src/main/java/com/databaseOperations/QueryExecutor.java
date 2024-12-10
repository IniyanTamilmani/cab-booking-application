package com.databaseOperations;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import java.sql.SQLException;
import java.util.ArrayList;

import org.json.JSONArray;

import com.utils.JsonHelper;

public class QueryExecutor {

	public JSONArray executeSelectOperation(String query, ArrayList<Object> columnValues)
			throws ClassNotFoundException, SQLException {
		ResultSet rs = null;
		Connection conn = null;
		PreparedStatement pstmt = null;
		JSONArray result = new JSONArray();
		JdbcConnector jdbc = new JdbcConnector();
		PlaceholderInjector inject = new PlaceholderInjector();
		try {
			conn = jdbc.getConnection();
			pstmt = conn.prepareStatement(query);
			if (columnValues != null) {
				inject.injectValues(pstmt, columnValues);
			}
			rs = pstmt.executeQuery();
			result = JsonHelper.resultSetToJsonArray(rs);

		} finally {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
			jdbc.closeConnection(conn);
		}
		return result;
	}

	public int executeUpdateOperation(String query, ArrayList<Object> columnValues)
			throws ClassNotFoundException, SQLException {
		PreparedStatement pstmt = null;
		Connection conn = null;
		int result = -1;
		JdbcConnector jdbc = new JdbcConnector();
		PlaceholderInjector inject = new PlaceholderInjector();
		try {
			conn = jdbc.getConnection();
			pstmt = conn.prepareStatement(query);

			if (columnValues != null) {
				inject.injectValues(pstmt, columnValues);
			}
			result = pstmt.executeUpdate();
		} finally {

			if (pstmt != null) {
				pstmt.close();
			}
			jdbc.closeConnection(conn);

		}
		return result;
	}


}
