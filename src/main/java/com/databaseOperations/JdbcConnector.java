package com.databaseOperations;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JdbcConnector {
	private static final String url = "jdbc:postgresql://localhost:5432/iniyan-pt7696";
	private static final String username = "iniyan-pt7696";
	private static final String password = "";

	private Connection conn = null;
	private PreparedStatement pstmt = null;

	public Connection getConnection() throws ClassNotFoundException, SQLException {
		Class.forName("org.postgresql.Driver");
		conn = DriverManager.getConnection(url, username, password);
		return conn;
	}

	public void closeConnection(Connection conn) throws ClassNotFoundException, SQLException {
		if (conn != null) {
			conn.close();
		}
	}

}