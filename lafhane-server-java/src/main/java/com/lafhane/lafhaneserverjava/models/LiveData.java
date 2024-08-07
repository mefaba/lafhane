package com.lafhane.lafhaneserverjava.models;

import com.google.gson.Gson;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * The LiveData class
 * This table have one to one relationship with each player.
 * It stores current game score of the player cumulatively.
 * score will be 0 for each player at the start of each game.
 * Later this can be delivered by redis -from  fast sort term memory
 */
@Document(collection = "livedatas")
public class LiveData {
    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private ObjectId playerId;
    private int score;
    private List<String> correctAnswers;

    public LiveData(ObjectId playerId) {
        this.playerId = playerId;
        this.score = 0;
        this.correctAnswers = new ArrayList<>();
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void updateScore(int score){
        this.score += score;
    }

    public List<String> getCorrectAnswers() {
        return correctAnswers;
    }

    // Method to add a correct answer
    public void addCorrectAnswer(String answer) {
        if (this.correctAnswers == null) {
            this.correctAnswers = new ArrayList<>();
        }
        this.correctAnswers.add(answer);
    }

    public String toJson(){
        return new Gson().toJson(this);
    }
}
