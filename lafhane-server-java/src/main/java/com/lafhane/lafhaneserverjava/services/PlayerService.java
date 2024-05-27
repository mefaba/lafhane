package com.lafhane.lafhaneserverjava.services;


import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.InsertOneResult;
import org.bson.Document;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.mongodb.client.model.Filters.eq;

@Service
public class PlayerService {
    //ATTRIBUTES
    private final MongoClient mongoClient;
    MongoCollection<Document> collection;
    //CONSTRUCTORS
    @Autowired
    public PlayerService(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
        this.collection = mongoClient.getDatabase("lafhane").getCollection("players");
    }

    //GETTERS and SETTERS


    //METHODS
    public void loginNewPlayer() {
        // TODO implement here
    }


    public void loginExistingPlayer() {
        // TODO implement here
    }


    public void createPlayer(String username) {
        // TODO implement here
        //InsertOneResult result = collection.insertOne(username);
          /*{
            "acknowledged" : true,
             "insertedId" : ObjectId("56fc40f9d735c28df206d078")
        }*/
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