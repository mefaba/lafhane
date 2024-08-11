package com.lafhane.lafhaneserverjava.models;

import com.lafhane.lafhaneserverjava.types.PlayerScorePair;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * The GameData class represents the data for game session.
 * GameData is not specific to each player.
 * including scores, answers, and identifiers for the player and game.
 */
@Document(collection = "gamedatas")
public class GameDataRecord {
    @Id
    private String id;
    private ObjectId puzzleId;
    //private ObjectId roomId;
    private Date created_at;

    @Transient
    private List<PlayerScorePair> playerScoresGame;
    @Transient
    private List<PlayerScorePair> playerScoresTotal;

    public GameDataRecord(String id) {
        this.id = id;
        this.playerScoresGame = new ArrayList<PlayerScorePair>();
        this.playerScoresTotal = new ArrayList<PlayerScorePair>();
    }

    public List<PlayerScorePair> getPlayerScoresGame() {
        return playerScoresGame;
    }

    public void setPlayerScoresGame(List<PlayerScorePair> playerScoresGame) {
        this.playerScoresGame = playerScoresGame;
    }

    public List<PlayerScorePair> getPlayerScoresTotal() {
        return playerScoresTotal;
    }

    public void setPlayerScoresTotal(List<PlayerScorePair> playerScoresTotal) {
        this.playerScoresTotal = playerScoresTotal;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
