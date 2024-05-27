package com.lafhane.lafhaneserverjava.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    @Autowired
    private Environment env;

    private int jwtExpirationInMs = 3600000 * 48; // 1 hour

    JwtService() {

    }

    public String generateToken(String username) {
        String secretKey = this.env.getProperty("JWT_SECRET");
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .sign(algorithm);
    }

    public DecodedJWT verifyToken(String token) {
        String secretKey = this.env.getProperty("JWT_SECRET");
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (JWTVerificationException exception) {
            //System.out.println("Invalid or expired JWT token");
            return null;
        }
    }

    public String getUsernameFromToken(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getSubject();
    }
}