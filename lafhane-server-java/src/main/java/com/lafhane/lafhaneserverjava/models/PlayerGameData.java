package com.lafhane.lafhaneserverjava.models;

import java.util.Map;

public class PlayerGameData {
    private int currentScore;
    Map<String, Integer> correctAnswers;

    public void addCorrectAnswer(String answer) {
        int point = this.calculatePoint(answer);
        this.increaseScore(point);
        correctAnswers.put(answer, point);
    }

    public int getCurrentScore() {
        return currentScore;
    }

    public void setCurrentScore(int currentScore) {
        this.currentScore = currentScore;
    }

    private void increaseScore(int increment) {
        this.currentScore += increment;
        // TODO implement here
    }

    private int calculatePoint(String answer) {
        // TODO implement here
        return 5;
    }
}
