package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.lafhane.lafhaneserverjava.security.JwtService;
import com.lafhane.lafhaneserverjava.services.CountdownService;
import com.lafhane.lafhaneserverjava.services.PlayerService;
import org.json.JSONObject;
import org.json.JSONString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final JwtService jwtService;

    @Autowired
    public ServerMaster(PlayerService playerService,
                        GameMaster gameMaster, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.playerService = playerService;
        this.gameMaster = gameMaster;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<Player> register(@RequestBody Player player) {
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        Player savedPlayer = playerService.savePlayer(player);
        return ResponseEntity.ok(playerService.savePlayer(savedPlayer));
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
    public ResponseEntity<?> getGameTable() {
        String username = "test1";
        //TODO Ensure that the player is in the game, playerlist
        JSONObject responseJSON = new JSONObject()
                .put("username", username)
                .put("puzzle", gameMaster.getPuzzle().getLetters());
                //.put("gameState", gameMaster.getGameState())
                //.put("highScoresGame", gameMaster.getHighScoresGame())
                //.put("highScoresTotal", gameMaster.getHighScoresTotal())
                //.put("remainingTime", countdownService.getRemainingTime());
        return ResponseEntity.ok(responseJSON.toString());
    }

    @GetMapping("/api/verify-token")
    public ResponseEntity<?> verifyToken() {
        return ResponseEntity.ok(new JSONObject().put("isVerified", "true").toString());
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
