package com.mattiacannizzaro.security.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

	private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

//	@Override
//	public void commence(HttpServletRequest request, HttpServletResponse response,
//			AuthenticationException authException) throws IOException, ServletException {
//		logger.error("Unauthorized error: {}", authException.getMessage());
//
//		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
//		final Map<String, Object> body = new HashMap<>();
//		body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
//		body.put("error", "Unauthorized");
//		body.put("message", authException.getMessage());
//		body.put("path", request.getServletPath());
//
//		final ObjectMapper mapper = new ObjectMapper();
//		mapper.writeValue(response.getOutputStream(), body);
//	}

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		String path = request.getRequestURI().substring(request.getContextPath().length());
		if ("/api/public".equals(path)) { // Aggiungi l'operazione che vuoi autorizzare
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);
			response.setStatus(HttpServletResponse.SC_OK);
			final Map<String, Object> body = new HashMap<>();
			body.put("status", HttpServletResponse.SC_OK);
			body.put("message", "This operation is public");
			final ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(response.getOutputStream(), body);
		} else {
			logger.error("Unauthorized error: {}", authException.getMessage());
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			final Map<String, Object> body = new HashMap<>();
			body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
			body.put("error", "Unauthorized");
			body.put("message", authException.getMessage());
			body.put("path", request.getServletPath());
			final ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(response.getOutputStream(), body);
		}
	}

}
