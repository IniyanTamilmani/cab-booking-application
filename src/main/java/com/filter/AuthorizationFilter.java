package com.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AuthorizationFilter extends HttpFilter implements Filter {

	private static final Map<String, ArrayList<String>> resourceAccess = new HashMap<>();

	static {
		
		// User resources 		
		// to get available cabs for user
		resourceAccess.put("^/cabs\\?start_location=([^&]+)&end_location=([^&]+)$",
				new ArrayList<>(Arrays.asList("user", "admin", "driver", "superAdmin")));
		// to book a cab and to get the ride history for the driver--------
		resourceAccess.put("^/companies/\\d+/drivers/\\d+/cabs/\\d+/rides$",
				new ArrayList<>(Arrays.asList("user", "admin", "driver", "superAdmin")));
		// to get current ride
		resourceAccess.put("^/users/\\d+/rides\\?status=progress$",
				new ArrayList<>(Arrays.asList("user", "admin", "driver", "superAdmin")));
		// to report the driver and to cancel the ride(payLoad will vary)
		resourceAccess.put("^/users/\\d+/rides/\\d+$",
				new ArrayList<>(Arrays.asList("user", "admin", "driver", "superAdmin")));
		// to get the user ride details
		resourceAccess.put("^/users/\\d+/rides$",
				new ArrayList<>(Arrays.asList("user", "admin", "driver", "superAdmin")));
		// to get user detail (for user)
		resourceAccess.put("^/users/\\d+\\?role=user$", new ArrayList<>(Arrays.asList("user")));
		// to upgrade user to driver
		resourceAccess.put("^/users/\\d+/drivers$", new ArrayList<>(Arrays.asList("user")));
		// to get available companies
		resourceAccess.put("^/companies$", new ArrayList<>(Arrays.asList("user")));


		// Driver resources
		//to get the ride requests
		resourceAccess.put("^/companies/\\d+/drivers/\\d+/cabs/\\d+/rides\\?status=waiting$",
				new ArrayList<>(Arrays.asList("driver")));
		//to check-in and check-out and updateLocation
		resourceAccess.put("^/companies/\\d+/drivers/\\d+/cabs/\\d+$", new ArrayList<>(Arrays.asList("driver")));
		//to get the current ride in progress
		resourceAccess.put("^/companies/\\d+/drivers/\\d+/cabs/\\d+/rides\\?status=progress$",
				new ArrayList<>(Arrays.asList("driver")));
		//to update the ride status-started,accepted,completed ,rejected and to report
		resourceAccess.put("^/companies/\\d+/drivers/\\d+/cabs/\\d+/rides/\\d+$",
				new ArrayList<>(Arrays.asList("driver")));
		//to get weekly earnings of the driver
		resourceAccess.put("^/companies/\\d+/drivers/\\d+/cabs/\\d+/rides\\?period=weekly$",
				new ArrayList<>(Arrays.asList("driver")));
		//to get driver profile
		resourceAccess.put("^/users/\\d+\\?role=driver$", new ArrayList<>(Arrays.asList("driver")));
		//to cancel driver request , to block or unblock driver and to reject or accept driver requests
		resourceAccess.put("^/companies/\\d+/drivers/\\d+$", new ArrayList<>(Arrays.asList("driver","admin")));

		//Admin resources
		//to get the pending driver requests
		resourceAccess.put("^/companies/\\d+/drivers\\?status=pending$", new ArrayList<>(Arrays.asList("admin")));
		//to get driver details
		resourceAccess.put("^/companies/\\d+/drivers$", new ArrayList<>(Arrays.asList("admin")));
		//to get users details
		resourceAccess.put("^/companies/\\d+/users$", new ArrayList<>(Arrays.asList("admin")));
		//to block or unblock user
		resourceAccess.put("^/companies/\\d+/users/\\d+/block_lists$", new ArrayList<>(Arrays.asList("admin")));
		//to get company ride history
	    resourceAccess.put("^/companies/\\d+/rides$", new ArrayList<>(Arrays.asList("admin")));
	    //to get the fare details of the company
	    resourceAccess.put("^/companies/\\d+/fares$", new ArrayList<>(Arrays.asList("admin")));
	    //to get Admin profile
	  	resourceAccess.put("^/users/\\d+\\?role=admin$", new ArrayList<>(Arrays.asList("admin")));
	  	 //to update cab fare
	  	resourceAccess.put("^/companies/(\\d+)/cabs/(\\d+)/fares/(\\d+)$", new ArrayList<>(Arrays.asList("admin")));
	    
		// SuperAdmin resources
		
		//to get superAdmin profile
		resourceAccess.put("^/users/\\d+\\?role=superAdmin$", new ArrayList<>(Arrays.asList("superAdmin")));
		//to get pending requests
		resourceAccess.put("^/companies\\?status=pending$", new ArrayList<>(Arrays.asList("superAdmin")));
		//to get company details
		resourceAccess.put("^/companies\\?status=approved$", new ArrayList<>(Arrays.asList("superAdmin")));
		//to approve and reject company approvals
		resourceAccess.put("^/companies/\\d+$", new ArrayList<>(Arrays.asList("superAdmin")));
		
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

		HttpSession session = httpRequest.getSession(false);

		if (session == null || !validateSession(httpRequest, session)) {
			httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			httpResponse.getWriter().write("Invalid Session");
			return;
		}

		String sessionUserRole = (String) session.getAttribute("role");
		String fullRequestURI = getRequestURI(httpRequest);
		Integer sessionUserId = (Integer) session.getAttribute("userId");

		if (checkAccess(fullRequestURI, sessionUserRole)) {
			if ("user".equals(sessionUserRole) && validateIdInUrlForUser(fullRequestURI, sessionUserId)) {
				chain.doFilter(request, response);
			} else if ("driver".equals(sessionUserRole)) {
				handleDriverAccess(fullRequestURI, sessionUserId, session, chain, httpRequest, httpResponse);
			} else if ("admin".equals(sessionUserRole) ) {
				handleAdminAccess(fullRequestURI, sessionUserId, session, chain, httpRequest, httpResponse);
			} else if("superAdmin".equals(sessionUserRole)) {
				chain.doFilter(httpRequest, httpResponse);
			}
			else {
				unauthorizedResponse(httpResponse);
			}
		} else {
			unauthorizedResponse(httpResponse);
		}
	}

	private boolean validateSession(HttpServletRequest request, HttpSession session) {
		String sessionUserAgent = (String) session.getAttribute("userAgent");
		String requestUserAgent = request.getHeader("user-agent");
		String browserSessionId = request.getHeader("Cookie").replace("JSESSIONID=", "");
		return sessionUserAgent != null && sessionUserAgent.equals(requestUserAgent)
				&& session.getId().equals(browserSessionId);
	}

	private String getRequestURI(HttpServletRequest request) {
		String requestURI = request.getRequestURI();
		String queryString = request.getQueryString();
		String cleanedRequestURI = requestURI.startsWith("/api/v1") ? requestURI.substring(7) : requestURI;
		return queryString == null ? cleanedRequestURI : cleanedRequestURI + "?" + queryString;
	}

	private void unauthorizedResponse(HttpServletResponse response) throws IOException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.getWriter().write("Unauthorized Request");
	}

	private boolean checkAccess(String url, String role) {
		for (Map.Entry<String, ArrayList<String>> entry : resourceAccess.entrySet()) {
			if (url.matches(entry.getKey())) {
				return entry.getValue().contains(role);
			}
		}
		return false;
	}

	private void handleDriverAccess(String url, Integer userId, HttpSession session, FilterChain chain,
			HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Integer sessionCabId = (Integer) session.getAttribute("cabId");
		Integer sessionCompanyId = (Integer) session.getAttribute("companyId");
		if (validateIdInUrlForUser(url, userId) || validateIdInUrlForDriver(url, userId, sessionCabId, sessionCompanyId)) {
			chain.doFilter(request, response);
		} else {
			unauthorizedResponse(response);
		}
	}

	private void handleAdminAccess(String url, Integer userId, HttpSession session, FilterChain chain,
			HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Integer sessionCompanyId = (Integer) session.getAttribute("companyId");

		if (validateIdInUrlForUser(url, userId) || validateIdInUrlForAdmin(url, sessionCompanyId)) {
			chain.doFilter(request, response);
		} else {
			unauthorizedResponse(response);
		}
	}

	private boolean validateIdInUrlForDriver(String url, int userId, int cabId, int companyId) {
		return validateIdInUrl(url, userId, "/drivers/(\\d+)") && validateIdInUrl(url, cabId, "/cabs/(\\d+)")
				&& validateIdInUrl(url, companyId, "/companies/(\\d+)");
	}

	private boolean validateIdInUrlForUser(String url, int userId) {
		return validateIdInUrl(url, userId, "/users/(\\d+)");
	}

	private boolean validateIdInUrlForAdmin(String url, int companyId) {
		return validateIdInUrl(url, companyId, "/companies/(\\d+)");
	}

	private boolean validateIdInUrl(String url, int id, String pattern) {
		Matcher matcher = Pattern.compile(pattern).matcher(url);
		return !(matcher.find() && Integer.parseInt(matcher.group(1)) != id);
	}
}
