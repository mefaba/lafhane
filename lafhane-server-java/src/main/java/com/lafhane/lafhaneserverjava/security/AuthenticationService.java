package com.lafhane.lafhaneserverjava.security;

import com.lafhane.lafhaneserverjava.repository.PlayerRepository;
import org.json.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



public class AuthenticationService {
    private final PlayerRepository playerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationService(PlayerRepository playerRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.playerRepository = playerRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public JSONObject authenticate(JSONObject request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getString("username"),
                        request.getString("password")
                )
        );

        return new JSONObject();

    }
}
