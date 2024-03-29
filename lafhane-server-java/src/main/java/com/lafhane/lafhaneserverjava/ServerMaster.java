package com.lafhane.lafhaneserverjava;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.lafhane.lafhaneserverjava.dto.PlayerDTO;
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
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

@RestController
public class ServerMaster {

    private GameMaster gameMaster;
    private final MongoClient mongoClient;
    private final PlayerService playerService;
    private final JwtService jwtService;

    @Autowired
    public ServerMaster(MongoClient mongoClient, PlayerService playerService, JwtService jwtService,
            GameMaster gameMaster) {
        this.mongoClient = mongoClient;
        this.playerService = playerService;
        this.jwtService = jwtService;
        this.gameMaster = gameMaster;
    }

    public MongoClient getMongoClient() {
        return mongoClient;
    }

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody PlayerDTO playerDTO,
            @RequestHeader("Authorization") String bearerToken) {
        try {
            System.out.println("login method called" + bearerToken);
            String username = playerDTO.getUsername();
            MongoDatabase database = mongoClient.getDatabase("lafhane");
            MongoCollection<Document> collection = database.getCollection("players");
            //collection.createIndex(new Document().append("username", 1).append("unique", true));//{ "username": 1 }, { unique: true }

            // check if username exist in db
            Document doc = collection.find(eq("username", username)).first();

            // Player exist in DB. get jwt token from client to confirm user is logging from
            // same device
            if (doc != null) {
                String jwtToken = bearerToken.substring(7); // Remove "Bearer " prefix;
                // TODO DecodedJWT decodedJWT = jwtService.verifyToken(jwtToken);
                gameMaster.AddPlayer(new Player(username));
                String response = new JSONObject().put("username", username).put("jwtToken", jwtToken).toString();
                return ResponseEntity.ok(response);
            }
            // Player does not exist in DB. Create a new player
            else {
                Player player = new Player(username);
                InsertOneResult result = collection.insertOne(player.toDocument());
                gameMaster.AddPlayer(player);
                System.out.println("New Player " + player.getUserName() + " logged in.");
                return ResponseEntity.ok("New Player " + player.getUserName() + " logged in.");
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
                    .put("highScoresTotal", gameMaster.getHighScoresTotal());

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
    
            Map<String, Integer> checkResult = gameMaster.getPuzzle().checkAnswer(answer);
            if(checkResult == null){
                return ResponseEntity.ok(new JSONObject()
                        .put("resultStatus", "wrong")
                        .put("resultData", "")
                        .toString());
            }
            return ResponseEntity.ok(new JSONObject()
                    .put("resultStatus", "correct")
                    .put("resultData", checkResult.get(answer))
                    .toString());
            //JSONObject responseJSON = new JSONObject();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
