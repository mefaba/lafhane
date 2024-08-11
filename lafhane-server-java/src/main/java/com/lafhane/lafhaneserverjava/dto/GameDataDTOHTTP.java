package com.lafhane.lafhaneserverjava.dto;

import com.google.gson.Gson;
import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.lafhane.lafhaneserverjava.types.PlayerScorePair;

import java.io.Serializable;
import java.util.List;



public class GameDataDTOHTTP  {
    private String gameId;
    private String gameState;
    private int remainingTime;
    private String puzzleLetters;
    private List<String> puzzleAnswerList;
    private List<PlayerScorePair> playerScoresGame;
    private List<PlayerScorePair> playerScoresTotal;
    List<String> correctAnswers;

    public GameDataDTOHTTP(String gameId, String gameState, int remainingTime, String puzzleLetters, List<String> puzzleAnswerList, List<PlayerScorePair> playerScoresGame, List<PlayerScorePair> playerScoresTotal, List<String> correctAnswers) {
        this.gameId = gameId;
        this.gameState = gameState;
        this.remainingTime = remainingTime;
        this.puzzleLetters = puzzleLetters;
        this.puzzleAnswerList = puzzleAnswerList;
        this.playerScoresGame = playerScoresGame;
        this.playerScoresTotal = playerScoresTotal;
        this.correctAnswers = correctAnswers;
    }


    public void setPuzzleLetters(String puzzleLetters) {
        this.puzzleLetters = puzzleLetters;
    }


    public String toJson(){
        return new Gson().toJson(this);
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }

    public void setRemainingTime(int remainingTime) {
        this.remainingTime = remainingTime;
    }

    public void setGameState(String gameState) {
        this.gameState = gameState;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public void setPlayerScoresGame(List<PlayerScorePair> playerScoresGame) {
        this.playerScoresGame = playerScoresGame;
    }

    public void setPlayerScoresTotal(List<PlayerScorePair> playerScoresTotal) {
        this.playerScoresTotal = playerScoresTotal;
    }

    public List<String> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(List<String> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }
}