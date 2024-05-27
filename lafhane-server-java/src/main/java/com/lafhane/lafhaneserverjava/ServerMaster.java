package com.lafhane.lafhaneserverjava;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.lafhane.lafhaneserverjava.config.WebSocketConfig.WebSocketHandler;
import com.lafhane.lafhaneserverjava.dto.PlayerDTO;
import com.lafhane.lafhaneserverjava.enums.GAMESTATE;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.services.JwtService;
import com.lafhane.lafhaneserverjava.services.PlayerService;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;
import org.bson.Document;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import static com.mongodb.client.model.Filters.eq;

@RestController
public class ServerMaster {

    private GameMaster gameMaster;
    private final MongoClient mongoClient;
    private final PlayerService playerService;
    private final JwtService jwtService;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);


    @Autowired
    private WebSocketHandler webSocketHandler;

    @Autowired
    public ServerMaster(MongoClient mongoClient, PlayerService playerService, JwtService jwtService,
            GameMaster gameMaster, WebSocketHandler webSocketHandler) {
        this.mongoClient = mongoClient;
        this.playerService = playerService;
        this.jwtService = jwtService;
        this.gameMaster = gameMaster;
        this.webSocketHandler = webSocketHandler;
    }

    public MongoClient getMongoClient() {
        return mongoClient;
    }

    /**
     * Description: Check
     * 1.check if jwt token is valid. Existing User
     * 2.check if username exist in db. Not existing User
     * 3.create new user. Not existing User
     * */
    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody PlayerDTO playerDTO,
            @RequestHeader(value="Authorization",  required = false) String bearerToken) {
        try {
            String jwtToken = null;
            DecodedJWT decodedJWT == null;
            if (bearerToken != null && bearerToken.length() > 7) {
                jwtToken = bearerToken.substring(7);// Remove "Bearer " prefix;
                decodedJWT = jwtService.verifyToken(jwtToken);
            }
        
            if(decodedJWT != null){
                //We are able to verify JWT token. Get existing user from db.
                JSONObject existingPlayer = playerService.getPlayerByUsername(playerDTO.getUsername());
                //gameMaster.AddPlayer(new Player(playerDTO.getUsername()));
                String response = new JSONObject().put("username", username).put("jwtToken", jwtToken).toString();
                return ResponseEntity.ok(response);
            }
            else if(playerService.isPlayerNameExist(playerDTO.getUsername())){
                //Choose another username, this username exist in db
                String response = new JSONObject().put("username", "").put("jwtToken", "").toString();
                return ResponseEntity.ok(response);
            }
            else{
                //Create new user
                Player newPlayer = playerService.createPlayer(playerDTO.getUsername());
                gameMaster.AddPlayer(newPlayer);
                String response = new JSONObject().put("username", newPlayer).put("jwtToken", jwtToken).toString();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
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
                    .put("remainingTime", gameMaster.getRemainingTime());

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
    
            boolean checkResult = gameMaster.getPuzzle().checkAnswer(answer);
            if(!checkResult){
                return ResponseEntity.ok(new JSONObject()
                        .put("resultStatus", "wrong")
                        .put("resultData", "")
                        .toString());
            }
            //save answer to the player's game data
            gameMaster.getPlayer(username).gameData.addCorrectAnswer(answer);

            //increase player's score
            gameMaster.getPlayer(username).gameData.increaseScore(gameMaster.getPuzzle().getAnswerPoint(answer));

            return ResponseEntity.ok(new JSONObject()
                    .put("resultStatus", "correct")
                    .put("resultData", gameMaster.getPuzzle().getAnswerPoint(answer))
                    .toString());
            //JSONObject responseJSON = new JSONObject();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


    //WebSocket
    /**
     * This method is scheduled to run at specific intervals defined by the cron expression.
     * It changes the game state to IN_LOBBY and broadcasts the updated game state to all connected clients.
     */
    @Scheduled(cron ="0 3,7,11,15,19,23,27,31,35,39,43,47,51,55,59 * * * ?") // Check every minute
    public void scheduleTask() {
        //END GAME  && START LOBBY
        gameMaster.EndGame();
        gameMaster.StartLobby();
    }

    @Scheduled(cron = "0 0,4,8,12,16,20,24,28,32,36,40,44,48,52,56 * * * ?")
    public void scheduleTask2() {
        //START GAME
        gameMaster.StartGame();
    }

    @Scheduled(fixedDelay = 10 * 1000)
    public void scheduleTask3() {
        if(gameMaster.getGameState() != null)
        {
            webSocketHandler.broadcastMessage(gameMaster.getGameState().toString());
        }
    }
}
