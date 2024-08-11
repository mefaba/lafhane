package com.lafhane.lafhaneserverjava.services;


import com.lafhane.lafhaneserverjava.GameMaster;
import com.lafhane.lafhaneserverjava.models.LiveData;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Score;
import com.lafhane.lafhaneserverjava.repository.LiveDataRepository;
import com.lafhane.lafhaneserverjava.repository.PlayerRepository;
import com.lafhane.lafhaneserverjava.repository.ScoreRepository;
import com.lafhane.lafhaneserverjava.types.PlayerScorePair;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ScoreService {
    private static final Logger logger = LoggerFactory.getLogger(GameMaster.class);
    private MongoClient mongoClient;
    private MongoCollection<Document> scoresCollection;
    private LiveDataRepository liveDataRepository;
    private ScoreRepository scoreRepository;
    private PlayerRepository playerRepository;

    public ScoreService(MongoClient mongoClient, LiveDataRepository liveDataRepository, ScoreRepository scoreRepository, PlayerRepository playerRepository) {
        this.mongoClient = mongoClient;
        this.scoresCollection = mongoClient.getDatabase("lafhane").getCollection("scores");
        this.liveDataRepository = liveDataRepository;
        this.scoreRepository = scoreRepository;
        this.playerRepository = playerRepository;
    }

    public List<PlayerScorePair> getTopPlayersInGame(String gameId) {
        List<Document> topPlayers = scoresCollection.aggregate(Arrays.asList(
                Aggregates.match(new Document("gameId", new ObjectId(gameId))),
                Aggregates.group("$playerId", Accumulators.sum("score", "$score")),
                Aggregates.sort(Sorts.descending("score")),
                Aggregates.limit(10)
        )).into(new ArrayList<>());

        List<PlayerScorePair> playerScorePairs = new ArrayList<>();
        for (Document doc : topPlayers) {
            String playerId = doc.getObjectId("_id").toString();
            String playerName = PlayerService.getPlayerNameById(playerRepository,playerId);
            int score = doc.getInteger("score");
            playerScorePairs.add(new PlayerScorePair(playerName, score));
        }

        return playerScorePairs;
    }

    public List<PlayerScorePair> getTopPlayersInTotal() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date todayMidnight = calendar.getTime();

        try {
            List<Document> topPlayers = scoresCollection.aggregate(Arrays.asList(
                    Aggregates.match(new Document("created_at", new Document("$gte", todayMidnight))),
                    Aggregates.group("$playerId", Accumulators.sum("score", "$score")),
                    Aggregates.sort(Sorts.descending("score"))
            )).into(new ArrayList<>());

            List<PlayerScorePair> result = new ArrayList<>();
            for (Document doc : topPlayers) {
                String playerId = doc.getObjectId("_id").toString();
                String playerName = PlayerService.getPlayerNameById(playerRepository,playerId);
                int score = doc.getInteger("score");
                // TODO: Implement player name lookup
                result.add(new PlayerScorePair(playerName, score));
            }

            return result;
        } catch (Exception e) {
            // Log the exception
            logger.error("Error retrieving top players: ", e);
            return Collections.emptyList();
        }
    }

    public void saveScores(String gameId) {
        // Fetch all LiveData documents
        List<LiveData> liveDataList = liveDataRepository.findAll();

        // Iterate through each LiveData document
        for (LiveData liveData : liveDataList) {
            // Create a new Score object
            Score score = new Score();
            score.setGameId(new ObjectId(gameId));
            score.setPlayerId(liveData.getPlayerId());
            score.setScore(liveData.getScore());
            score.setCreated_at(new Date());

            // Save the Score object
            scoreRepository.save(score);
        }
    }

    public void addLiveDataForPlayer(ObjectId playerId){
        LiveData playerData = new LiveData(playerId);
        liveDataRepository.save(playerData);
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
