package com.filter;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;


import com.utils.CustomException;
import com.utils.JsonHelper;

public class MainServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		processMethod(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		processMethod(request, response);
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		processMethod(request, response);
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		processMethod(request, response);
	}

	private void processMethod(HttpServletRequest request, HttpServletResponse response) {
		String requestType = request.getMethod();
		String endPoint = endPoint(request.getRequestURI());
		String packagename = getPackage(endPoint);
		String method = new StringBuilder("do").append(Character.toUpperCase(requestType.charAt(0)))
				.append(requestType.substring(1).toLowerCase()).toString();
		String responseString = null;
		try {

			if (request.getRequestURI().startsWith("/api/v1")) {
				Map<String, String> parameters = getParameters(request);
				Class<?> clzz = Class.forName(packagename);
				Object obj = clzz.getDeclaredConstructor().newInstance();
				if (requestType.equals("GET") || requestType.equals("DELETE")) {
					Method meth = clzz.getDeclaredMethod(method, Map.class);
					responseString = (String) meth.invoke(obj, parameters);
				} else {					
					JSONObject payload = JsonHelper.requestToJson(request);
					Method meth = clzz.getDeclaredMethod(method, Map.class, JSONObject.class);
					responseString = (String) meth.invoke(obj, parameters, payload);
				}
				response.setStatus(200);
				response.getWriter().write(responseString);
				response.setContentType("application/json");
			} else if (request.getRequestURI().startsWith("/auth/")) {
				new Authentication().doProcess(request, response);
			}
		} catch (Exception e) {
			Throwable cause = e.getCause();
			if (cause instanceof CustomException) {
				CustomException ce = (CustomException) cause;
				response.setStatus(ce.getStatusCode());
				try {
					response.getWriter().write(new JSONObject().put("message", ce.getMessage()).toString());
				} catch (JSONException | IOException e1) {
					e1.printStackTrace();
				}
			} else if (cause instanceof SQLException) {
				SQLException se = (SQLException) cause;
				response.setStatus(400);
				try {
					response.getWriter().write(new JSONObject().put("message", se.getMessage()).toString());
				} catch (JSONException | IOException e1) {
					e1.printStackTrace();
				}

			} else {
				response.setStatus(500);
				try {
					response.getWriter().write(new JSONObject().put("message", e.getMessage()).toString());
				} catch (JSONException | IOException e1) {
					e1.printStackTrace();
				}
			}
		}

	}

	public static Map<String, String> getQueryParams(HttpServletRequest request) {
		Map<String, String> queryParams = new HashMap<>();

		String queryString = request.getQueryString();

		if (queryString != null) {
			String[] pairs = queryString.split("&");

			for (String pair : pairs) {
				String[] keyValue = pair.split("=");

				if (keyValue.length == 2) {
					queryParams.put(keyValue[0], keyValue[1]);
				} else if (keyValue.length == 1) {
					queryParams.put(keyValue[0], "");
				}
			}
		}
		HttpSession session = request.getSession(false);
		Integer sessionUserId = (Integer) session.getAttribute("userId");
		queryParams.put("sessionUserId", String.valueOf(sessionUserId));
		String sessionUserRole = String.valueOf(session.getAttribute("role"));
		queryParams.put("sessionUserRole", sessionUserRole);

		return queryParams;
	}

	public static Map<String, String> parseUriPath(String uri) {
		uri = uri.replace("/CabBookingApplication/api/v1/", "");
		Map<String, String> pathParams = new HashMap<>();

		String trimmedUri = uri.replaceAll("^/|/$", "");
		String[] segments = trimmedUri.split("/");

		for (int i = 0; i < segments.length; i += 2) {
			String key = segments[i];

			if (i + 1 < segments.length) {
				String value = segments[i + 1];
				pathParams.put(key, value);
			}
		}

		return pathParams;
	}

	// Combined method to get both query and path parameters
	public static Map<String, String> getParameters(HttpServletRequest request) {
		Map<String, String> combinedParams = new HashMap<>();

		String uri = request.getRequestURI();

		Map<String, String> pathParams = parseUriPath(uri);
		combinedParams.putAll(pathParams);

		Map<String, String> queryParams = getQueryParams(request);
		combinedParams.putAll(queryParams);

		return combinedParams;
	}

	public String endPoint(String requestURI) {
		String[] pathParts = requestURI.split("/");
		int length = pathParts.length;
		if (length % 2 == 0) {
			return pathParts[length - 1];
		}
		return pathParts[length - 2];
	}

	private String getPackage(String endPoint) {
		Map<String, String> packageNames = new HashMap<>();
		packageNames.put("users", "User");
		packageNames.put("drivers", "Driver");
		packageNames.put("cabs", "Cab");
		packageNames.put("status", "Status");
		packageNames.put("rides", "Ride");
		packageNames.put("fares", "Fare");
		packageNames.put("companies", "Company");
		packageNames.put("locations", "Location");
		packageNames.put("block_lists", "BlockList");
		packageNames.put("auth", "Auth");

		return "com.handler." + packageNames.get(endPoint) + "Handler";
	}
}
