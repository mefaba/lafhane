package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.services.CountdownService;
import com.lafhane.lafhaneserverjava.services.PlayerService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
public class ServerMaster {
    @Autowired
    private CountdownService countdownService;
    private AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private GameMaster gameMaster;
    private final PlayerService playerService;

    @Autowired
    public ServerMaster(PlayerService playerService,
                        GameMaster gameMaster, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.playerService = playerService;
        this.gameMaster = gameMaster;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Player> register(@RequestBody Player player) {
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        Player savedPlayer = playerService.savePlayer(player);
        return ResponseEntity.ok(playerService.savePlayer(savedPlayer));
    }

    /**
     * Description: Check
     * 1.check if jwt token is valid. Existing User
     * 2.check if username exist in db. Not existing User
     * 3.create new user. Not existing User
     */
    @PostMapping("/login")
    public ResponseEntity<Authentication> login(@RequestBody Player player) {
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(player.getUsername(), player.getPassword());

        Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);

        return ResponseEntity.ok(authenticationResponse);
    }

    @GetMapping("/api/gamedata")
    public ResponseEntity<String> getGameTable(@RequestHeader("Authorization") String bearerToken) {
        try {
            //String jwtToken = bearerToken.substring(7); // Remove "Bearer " prefix;
            // TODO DecodedJWT decodedJWT = jwtService.verifyToken(jwtToken);
            //String username = jwtService.getUsernameFromToken(jwtToken);
            String username = "test1";
            //TODO Ensure that the player is in the game, playerlist
            JSONObject responseJSON = new JSONObject()
                    .put("username", username)
                    .put("puzzle", gameMaster.getPuzzle().toString())
                    .put("gameState", gameMaster.getGameState())
                    .put("highScoresGame", gameMaster.getHighScoresGame())
                    .put("highScoresTotal", gameMaster.getHighScoresTotal())
                    .put("remainingTime", countdownService.getRemainingTime());

            return ResponseEntity.ok(responseJSON.toString());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


    @PostMapping("/api/check_answer")
    public ResponseEntity<String> getCheckAnswer(@RequestBody Map<String,String> payload, @RequestHeader("Authorization") String bearerToken) {
        try {
            String answer = payload.get("answer");
            if(answer == null || answer.isEmpty()){
                return ResponseEntity.badRequest().body("Error: Answer is empty");
            }
            //String jwtToken = bearerToken.substring(7); // Remove "Bearer " prefix;
            // TODO DecodedJWT decodedJWT = jwtService.verifyToken(jwtToken);
            //String username = jwtService.getUsernameFromToken(jwtToken);
            String username = "test1";
            //TODO Ensure that the player is in the game, playerlist
    
            boolean checkResult = gameMaster.checkAnswer(answer);
            if(!checkResult){
                return ResponseEntity.ok(new JSONObject()
                        .put("resultStatus", "wrong")
                        .put("resultData", "")
                        .toString());
            }
            //save answer to the player's game data
            //gameMaster.getPlayer(username).gameData.addCorrectAnswer(answer);

            //increase player's score
            //gameMaster.getPlayer(username).gameData.increaseScore(gameMaster.getPuzzle().getAnswerPoint(answer));

            return ResponseEntity.ok(new JSONObject()
                    .put("resultStatus", "correct")
                    //.put("resultData", gameMaster.getPuzzle().getAnswerPoint(answer))
                    .toString());
            //JSONObject responseJSON = new JSONObject();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
