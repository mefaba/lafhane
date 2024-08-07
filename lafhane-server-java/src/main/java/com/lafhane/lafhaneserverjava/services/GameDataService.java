package com.lafhane.lafhaneserverjava.services;


import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameDataService {
    private MongoClient mongoClient;
    private MongoCollection<Document> gameDataCollection;
    @Autowired
    public void ScoreService(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
        this.gameDataCollection = mongoClient.getDatabase("lafhane").getCollection("gamedatas");
    }
}
