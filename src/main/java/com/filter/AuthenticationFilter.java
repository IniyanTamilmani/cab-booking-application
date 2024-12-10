package com.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

public class AuthenticationFilter extends HttpFilter implements Filter {
       

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

		HttpSession session = httpRequest.getSession(false);
		
		// If no session
		if (session == null) {
			chain.doFilter(request, response);
			return;
		}
		
		String browserSessionId = httpRequest.getHeader("Cookie").replace("JSESSIONID=","");
		String tomcatSessionId = session.getId();

		
		String sessionUserAgent = (String) session.getAttribute("userAgent"); 
		String requestUserAgent = (String) httpRequest.getHeader("user-agent");
		
		
		if (sessionUserAgent != null && requestUserAgent != null && 
				sessionUserAgent.equals(requestUserAgent) && 
				browserSessionId.equals(tomcatSessionId)) {
			httpResponse.getWriter().write(new JSONObject().put("message","Session is valid").toString());	
			return;
		}
		httpResponse.getWriter().write(new JSONObject().put("message","Session is invalid").toString());
		return;

	}


}
