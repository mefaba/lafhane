package com.lafhane.lafhaneserverjava.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
* Total score of the player of the game.
 * This table used to calculate scoreboard for last game and 24 hour total scoreboard.
*/
@Document(collection = "scores")
public class Score {
    @Id
    private ObjectId id;
    private ObjectId gameId;
    private ObjectId playerId;
    private int score;
    private Date created_at;


    public ObjectId getGameId() {
        return gameId;
    }

    public void setGameId(ObjectId gameId) {
        this.gameId = gameId;
    }

    public ObjectId getPlayerId() {
        return playerId;
    }

    public void setPlayerId(ObjectId playerId) {
        this.playerId = playerId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
}
