package com.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;



import com.google.gson.Gson;

public class JsonHelper {
	
	
	//RequestToJson
	public static JSONObject requestToJson(HttpServletRequest request) throws IOException
	{
		BufferedReader reader = null;
		reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
		String line = "";
		StringBuilder jsonData = new StringBuilder();
		while((line = reader.readLine())!=null) 
		{
			jsonData.append(line);
		}
		JSONObject json = new JSONObject(jsonData.toString());
		return json;
	}
	

	
	//jsonObjecttoPojo
	public static Object jsonToPojo(JSONObject json, Class<?> clazz) {
        Gson gson = new Gson();        
		return gson.fromJson(json.toString(), clazz);
    }
	

	public static JSONArray resultSetToJsonArray(ResultSet rs)
	{
        ResultSetMetaData metaData;
        JSONArray jsonArray = new JSONArray();
		try {
			metaData = rs.getMetaData();
			int columnCount = metaData.getColumnCount();
			while (rs.next()) 
			{
				JSONObject jsonObject = new JSONObject();
				for (int i = 1; i <= columnCount; i++) 
				{
					String columnName = metaData.getColumnName(i);
					Object columnValue = rs.getObject(i);
					jsonObject.put(columnName, columnValue);
				}
				jsonArray.put(jsonObject);
			}
		} catch (JSONException | SQLException e) {
			e.printStackTrace();
		}
        return jsonArray;
    }
	
	//resultSetToJsonObject
	public static JSONObject resultSetToJsonObject(ResultSet rs)
	{
        
        ResultSetMetaData metaData;
        JSONObject jsonObject = new JSONObject();
		try 
		{
			metaData = rs.getMetaData();
			int columnCount = metaData.getColumnCount();
			if (rs.next()) 
			{
				for (int i = 1; i <= columnCount; i++) 
				{
					String columnName = metaData.getColumnName(i);
					Object columnValue = rs.getObject(i);
					jsonObject.put(columnName, columnValue);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
        return jsonObject;
    }
	
	
}
