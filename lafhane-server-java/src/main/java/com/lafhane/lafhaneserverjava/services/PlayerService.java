package com.lafhane.lafhaneserverjava.services;


import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.repository.PlayerRepository;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.mongodb.client.model.Filters.eq;

@Service
public class PlayerService {
    //ATTRIBUTES
    private final MongoClient mongoClient;
    private final PlayerRepository playerRepository;
    MongoCollection<Document> collection;
    //CONSTRUCTORS
    @Autowired
    public PlayerService(MongoClient mongoClient, PlayerRepository playerRepository) {
        this.mongoClient = mongoClient;
        this.collection = mongoClient.getDatabase("lafhane").getCollection("players");
        this.playerRepository = playerRepository;
    }

    public Player savePlayer(Player player) {
        //TODO check if username exist
        return playerRepository.save(player);
    }

    public boolean isPlayerNameExist(String username) {
        Document doc = collection.find(eq("username", username)).first();
        return doc != null;
    }


    public JSONObject getPlayerByUsername(String username) {
        Document doc = collection.find(eq("username", username)).first();
        return new JSONObject(doc.toJson());
    }
}