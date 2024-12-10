package com.databaseOperations;

public class QueryGenerator {
    private StringBuilder query;

    public QueryGenerator() {
        this.query = new StringBuilder();
    }

    // Method for SELECT
    public QueryGenerator selectMethod(String tableName, String... columns) {
        query.append("SELECT ");
        columnHelper(columns);
        query.append(" FROM ").append(tableName).append(" ");
        return this;
    }

    // Method for INSERT
    public QueryGenerator insertMethod(String tableName, String... columns) {
        query.append("INSERT INTO ").append(tableName).append(" (");
        columnHelper(columns);
        query.append(") VALUES (");
        placeholderHelper(columns.length);
        query.append(") ");
        return this;
    }

    // Method for UPDATE
    public QueryGenerator updateMethod(String tableName, String... columns) {
        query.append("UPDATE ").append(tableName).append(" SET ");
        setHelper(columns);
        return this;
    }

    // Method for DELETE
    public QueryGenerator deleteMethod(String tableName) {
        query.append("DELETE FROM ").append(tableName).append(" ");
        return this;
    }

    // Helper to generate column names
    private QueryGenerator columnHelper(String... columns) {
    	if (columns == null || columns.length == 0 || columns[0].equals("*")) {
            query.append("* ");
        }else {
            for (int i = 0; i < columns.length; i++) {
                query.append(columns[i]);
                if (i < columns.length - 1) {
                    query.append(", ");
                }
            }
        }
        return this;
    }

    // Helper to generate placeholders for INSERT
    private QueryGenerator placeholderHelper(int size) {
        for (int i = 0; i < size; i++) {
            query.append("?");
            if (i < size - 1) {
                query.append(", ");
            }
        }
        return this;
    }

    // Helper to generate SET clause for UPDATE
    private QueryGenerator setHelper(String... columns) {
        for (int i = 0; i < columns.length; i++) {
            query.append(columns[i]).append(" = ?");
            if (i < columns.length - 1) {
                query.append(", ");
            }
        }
        return this;
    }


    
    public QueryGenerator whereHelper(String[] columns, String[] operators, String[] connections) {
        query.append(" WHERE ");
        for (int i = 0; i < columns.length; i++) {
            query.append(columns[i]).append(" ").append(operators[i]);

            // Append placeholder only if the operator is not "IS NULL" or "IS NOT NULL"
            if (!operators[i].equalsIgnoreCase("IS NULL") && !operators[i].equalsIgnoreCase("IS NOT NULL")) {
                query.append(" ?");
            }

            // Add connection (AND/OR) if it's not the last condition
            if (i < columns.length - 1) {
                query.append(" ").append(connections[i]).append(" ");
            }
        }
        return this;
    }


    // Method for JOIN with dynamic tables and conditions
    public QueryGenerator joinHelper(String jointype, String[] tables, String[] conditions1, String[] conditions2) {
        for (int i = 0; i < tables.length; i++) {
            query.append(" ").append(jointype.trim())
                 .append(" JOIN ").append(tables[i].trim())
                 .append(" ON ").append(conditions1[i].trim())
                 .append(" = ").append(conditions2[i].trim()).append(" ");
        }
        return this;
    }
    
    public QueryGenerator joinWithAndHelper(String jointype, String[] tables, String[] conditions1, String[] conditions2, String[] andConditions) {
        for (int i = 0; i < tables.length; i++) {
            query.append(" ").append(jointype.trim())
                 .append(" JOIN ").append(tables[i].trim())
                 .append(" ON ").append(conditions1[i].trim())
                 .append(" = ").append(conditions2[i].trim());
            
            // Add AND conditions if they exist
            if (andConditions != null && andConditions.length > 0) {
                query.append(" AND ");
                for (int j = 0; j < andConditions.length; j++) {
                    query.append(andConditions[j].trim())
                         .append(" = ?"); // Use placeholder for values
                    if (j < andConditions.length - 1) {
                        query.append(" AND ");
                    }
                }
            }
            query.append(" ");
        }
        return this;
    }


   
    
    public QueryGenerator returnHelper(String... columns) {
        if (columns != null && columns.length > 0) {
            query.append(" RETURNING ");
            for (int i = 0; i < columns.length; i++) {
                query.append(columns[i]);
                if (i < columns.length - 1) {
                    query.append(", ");
                }
            }
        }
        return this;
    }

    // Build and return the final query string
    public String build() {
        return query.toString().trim();
    }

   
}

