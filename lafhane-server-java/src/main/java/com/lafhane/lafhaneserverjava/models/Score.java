package com.lafhane.lafhaneserverjava.models;

import org.bson.Document;

public class Score {
    private int id;
    private int game_id;

    private int player_id;

    private int score;

    private int created_at;

    public void Score() {
        // TODO implement here
    }
    public Document toDocument() {
        return new Document()
                .append("game_id", this.game_id)
                .append("player_id", this.player_id)
                .append("score", this.score)
                .append("created_at", this.created_at);
    }
}
