package com.lafhane.lafhaneserverjava.services;


import com.lafhane.lafhaneserverjava.GameMaster;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.repository.PlayerRepository;
import com.mongodb.DuplicateKeyException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.mongodb.client.model.Filters.eq;

@Service
public class PlayerService {
    private static final Logger logger = LoggerFactory.getLogger(GameMaster.class);
    private final PasswordEncoder passwordEncoder;
    //ATTRIBUTES
    private final MongoClient mongoClient;
    private final PlayerRepository playerRepository;
    MongoCollection<Document> collection;
    //CONSTRUCTORS
    @Autowired
    public PlayerService(PasswordEncoder passwordEncoder, MongoClient mongoClient, PlayerRepository playerRepository) {
        this.passwordEncoder = passwordEncoder;
        this.mongoClient = mongoClient;
        this.collection = mongoClient.getDatabase("lafhane").getCollection("players");
        this.playerRepository = playerRepository;
    }

    public Player savePlayer(Player player) {
        try {
            player.setPassword(passwordEncoder.encode(player.getPassword()));
            return playerRepository.save(player);
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            logger.error("Unexpected error while saving player");
            throw e;
        }
    }
    public Player getPlayer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return playerRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }


    public boolean isPlayerNameExist(String username) {
        Document doc = collection.find(eq("username", username)).first();
        return doc != null;
    }

    public static String getPlayerNameById(PlayerRepository playerRepository,String playerId) {
        try {
            Player player = playerRepository.findById(playerId)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + playerId));
            return player.getUsername();
        } catch (Exception e) {
            logger.error("Error retrieving player name for id: " + playerId, e);
            throw new RuntimeException("Failed to retrieve player name", e);
        }
    }

}