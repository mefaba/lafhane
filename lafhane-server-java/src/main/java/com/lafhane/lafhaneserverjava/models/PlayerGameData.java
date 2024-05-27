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


    public void increaseScore(int increment) {
        this.currentScore += increment;
    }

    private int calculatePoint(String answer) {
        // TODO implement here
        return 5;
    }

    public void reset(){
        this.currentScore = 0;
        this.correctAnswers.clear();
    }
}
