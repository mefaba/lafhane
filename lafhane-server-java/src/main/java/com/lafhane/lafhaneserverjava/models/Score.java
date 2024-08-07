package com.lafhane.lafhaneserverjava.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
* Total score of the player of the game.
 * This table used to calculate scoreboard for last game and 24 hour total scoreboard.
*/
@Document
public class Score {
    @Id
    private ObjectId id;
    private ObjectId gameId;
    private ObjectId playerId;
    private int score;
}
