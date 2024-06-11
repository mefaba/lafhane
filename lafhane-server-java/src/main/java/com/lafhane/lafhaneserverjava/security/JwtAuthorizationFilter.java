package com.lafhane.lafhaneserverjava.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;

/*
    *The JWT token is extracted from the Authorization header.
    *The token is parsed and verified using the secret key.
    *The subject (username) is extracted from the decoded token.
    *A new UsernamePasswordAuthenticationToken is created with the extracted username, null credentials, and an empty list of authorities.
    *This token is returned and set in the security context, indicating that the user is authenticated.
* */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    @Autowired
    private  JwtService jwtService;

    public JwtAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwtToken = authHeader.substring(7);

        try{
            DecodedJWT jwtDecoded = jwtService.verifyToken(jwtToken);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(jwtDecoded.getSubject(), null, new ArrayList<>());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);

        }catch (JWTVerificationException exception){
            filterChain.doFilter(request, response);
        }
    }
}
