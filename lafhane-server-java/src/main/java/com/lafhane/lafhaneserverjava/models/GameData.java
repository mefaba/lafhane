package com.lafhane.lafhaneserverjava.models;

import java.util.Map;

public class GameData {
    private int gameScore;
    Map<String, Integer> correctAnswers;

    public void addCorrectAnswer(String answer) {
        int point = this.calculatePoint(answer);
        this.increaseScore(point);
        correctAnswers.put(answer, point);
    }

    public int getGameScore() {
        return gameScore;
    }

    public void setGameScore(int gameScore) {
        this.gameScore = gameScore;
    }

    private void increaseScore(int increment) {
        this.gameScore += increment;
        // TODO implement here
    }

    private int calculatePoint(String answer) {
        // TODO implement here
        return 5;
    }
}
