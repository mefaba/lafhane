package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.dto.GameDataDTOHTTP;
import com.lafhane.lafhaneserverjava.models.LiveData;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.security.JwtService;
import com.lafhane.lafhaneserverjava.services.CountdownService;
import com.lafhane.lafhaneserverjava.services.PlayerService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class ServerMaster {
    @Autowired
    private CountdownService countdownService;
    private AuthenticationManager authenticationManager;

    private GameMaster gameMaster;
    private final PlayerService playerService;
    private final JwtService jwtService;

    @Autowired
    public ServerMaster(PlayerService playerService,
                        GameMaster gameMaster, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.playerService = playerService;
        this.gameMaster = gameMaster;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Player player) {
        try{
            Player savedPlayer = playerService.savePlayer(player);
            String jwt = jwtService.generateToken(savedPlayer.getUsername());
            return ResponseEntity.ok(new JSONObject().put("jwt-token", jwt).toString());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"error\": \"Username already exists\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Player player) {
        UsernamePasswordAuthenticationToken unauthenticatedAuthObject = UsernamePasswordAuthenticationToken.unauthenticated(player.getUsername(), player.getPassword());
        Authentication authenticatedAuthObject = this.authenticationManager.authenticate(unauthenticatedAuthObject);
        SecurityContextHolder.getContext().setAuthentication(authenticatedAuthObject);
        UserDetails userDetails = (UserDetails) authenticatedAuthObject.getPrincipal();
        String jwt = jwtService.generateToken(userDetails.getUsername());
        return ResponseEntity.ok(new JSONObject().put("jwt-token", jwt).toString());
    }

    @GetMapping("/api/gamedata")
    public ResponseEntity<String> getGameTable() {
        //TODO Ensure that the player is in the game, playerlist
        GameDataDTOHTTP response =  new GameDataDTOHTTP(
                gameMaster.getGameID(),
                gameMaster.getGameState(),
                gameMaster.getRemainingTime(),
                gameMaster.getPuzzle().getLetters(),
                gameMaster.grabPuzzleAnswersList(),
                gameMaster.getPlayerScoresGame(),
                gameMaster.getPlayerScoresTotal(),
                gameMaster.getLiveData().getCorrectAnswers()
        );

        return ResponseEntity.ok(response.toJson());
    }

    @GetMapping("/api/verify-token")
    public ResponseEntity<?> verifyToken() {
        return ResponseEntity.ok(new JSONObject().put("isVerified", "true").toString());
    }

    @GetMapping("/")
    public String getServer(){
        return "Server is up and running!";
    }



    @PostMapping("/api/send_answer")
    public ResponseEntity<String> sendAnswer(@RequestBody Map<String,String> payload) {
        try {
            String answer = payload.get("answer");
            boolean result = gameMaster.handleAnswer(answer);
            LiveData liveData = gameMaster.getLiveData();
            if(!result){
                return ResponseEntity.ok(new JSONObject()
                        .put("result", "wrong")
                        .put("score", liveData.getScore())
                        .toString());
            }
            return ResponseEntity.ok(new JSONObject()
                    .put("result", "correct")
                    .put("score", liveData.getScore())
                    .toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/api/livedata")
    public ResponseEntity<?> getLiveData() {
        return ResponseEntity.ok(gameMaster.getLiveData().toJson());
    }
}
