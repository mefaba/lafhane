package com.lafhane.lafhaneserverjava.services;


import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Score;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class ScoreService {
    private MongoClient mongoClient;
    private MongoCollection<Document> collection;
    @Autowired
    public void ScoreService(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
        this.collection = mongoClient.getDatabase("lafhane").getCollection("scores");
    }

    public void saveScores(HashSet<Player> playerList, String game_id) {
        int created_at = (int) (System.currentTimeMillis() / 1000);
        for (Player player : playerList) {
            Score score = new Score();
            score.setGame_id(game_id);
            score.setPlayer_id(player.getId());
            score.setScore(player.getScore());
            score.setCreated_at(created_at);
        }

        // TODO implement here
    }

    public void updateHighScoresTotal() {
        // TODO implement here
    }
    public void getHighScores() {
        // TODO implement here
    }
    public void getHighScoresTotal() {
        // TODO implement here
    }

}
