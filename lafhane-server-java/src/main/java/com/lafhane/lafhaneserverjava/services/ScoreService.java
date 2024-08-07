package com.lafhane.lafhaneserverjava.services;


import com.lafhane.lafhaneserverjava.models.LiveData;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.repository.LiveDataRepository;
import com.lafhane.lafhaneserverjava.types.PlayerScorePair;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ScoreService {
    private MongoClient mongoClient;
    private MongoCollection<Document> scoresCollection;
    private LiveDataRepository liveDataRepository;

    public ScoreService(MongoClient mongoClient, LiveDataRepository liveDataRepository) {
        this.mongoClient = mongoClient;
        this.scoresCollection = mongoClient.getDatabase("lafhane").getCollection("scores");
        this.liveDataRepository = liveDataRepository;
    }

    public List<PlayerScorePair> getTopPlayersInGame() {
        Date threeMinutesAgo = new Date(System.currentTimeMillis() - 3 * 60 * 1000);

        List<Document> topPlayers = scoresCollection.aggregate(Arrays.asList(
                Aggregates.match(new Document("timestamp", new Document("$gte", threeMinutesAgo))),
                Aggregates.group("$playerId", Accumulators.sum("score", "$score")),
                Aggregates.sort(Sorts.descending("score")),
                Aggregates.limit(10)
        )).into(new ArrayList<>());

        List<PlayerScorePair> playerScorePairs = new ArrayList<>();
        for (Document doc : topPlayers) {
            String playerId = doc.getString("_id");
            int score = doc.getInteger("score");
            playerScorePairs.add(new PlayerScorePair(playerId, score));
        }

        return playerScorePairs;
    }

    public List<PlayerScorePair> getTopPlayersInTotal() {
        // Get today's date at midnight
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date todayMidnight = calendar.getTime();

        List<Document> topPlayers = scoresCollection.aggregate(Arrays.asList(
                Aggregates.match(new Document("timestamp", new Document("$gte", todayMidnight))),
                Aggregates.group("$playerId", Accumulators.sum("score", "$score")),
                Aggregates.sort(Sorts.descending("score")),
                Aggregates.limit(10)
        )).into(new ArrayList<>());

        List<PlayerScorePair> playerScorePairs = new ArrayList<>();
        for (Document doc : topPlayers) {
            String playerId = doc.getString("_id");
            int score = doc.getInteger("score");
            playerScorePairs.add(new PlayerScorePair(playerId, score));
        }

        return playerScorePairs;
    }

    public void saveScores(HashSet<Player> playerList, String game_id) {
        int created_at = (int) (System.currentTimeMillis() / 1000);
        for (Player player : playerList) {
            //Score score = new Score();
            //score.setGame_id(game_id);
            //score.setPlayer_id(player.getId());
            //score.setScore(player.getScore());
            //score.setCreated_at(created_at);
        }

        // TODO implement here
    }


    public void upsertLiveData(String answer, ObjectId playerId){
        LiveData liveData = liveDataRepository.findByPlayerId(playerId)
                .orElse(new LiveData(playerId));
        liveData.addCorrectAnswer(answer);
        liveData.updateScore(this.calculateAnswerPoint(answer));
        liveDataRepository.save(liveData);
    }

    public LiveData getLiveData(ObjectId playerId){
        return liveDataRepository.findByPlayerId(playerId).orElse(null);
    }

    public void cleanAllLiveData() {
        liveDataRepository.deleteAll();
    }

    public int calculateAnswerPoint(String answer){
        return answer.length() * 2-3;
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
