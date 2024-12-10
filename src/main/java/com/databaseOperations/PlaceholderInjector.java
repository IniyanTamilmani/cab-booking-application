package com.databaseOperations;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;

public class PlaceholderInjector {

    // INSERT, UPDATE, DELETE, SELECT
    public void injectValues(PreparedStatement pstmt, ArrayList<Object> columnValues) throws SQLException {
        setPreparedStatementValues(pstmt, columnValues);
    }


    // Helper method to set values in the PreparedStatement for column, WHERE, and HAVING conditions
    private int setPreparedStatementValues(PreparedStatement pstmt, ArrayList<Object> values) throws SQLException {
        int index = 1;
        for (Object value : values) {
            if (value == null) {
                pstmt.setNull(index++, java.sql.Types.NULL);
            } else if (value instanceof Integer) {
                pstmt.setInt(index++, (Integer) value);
            } else if (value instanceof String) {
                pstmt.setString(index++, (String) value);
            } else if (value instanceof Double) {
                pstmt.setDouble(index++, (Double) value);
            } else {
                pstmt.setObject(index++, value);
            }
        }
        return index;
    }

}
