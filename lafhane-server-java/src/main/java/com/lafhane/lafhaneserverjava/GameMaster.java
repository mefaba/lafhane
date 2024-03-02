package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.models.PlayerGameData;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.lafhane.lafhaneserverjava.services.PuzzleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;

@Component
public class GameMaster {
    private Puzzle puzzle;
    private String gameState; // play, lobby
    private int remainingTime;
    private HashSet<Player> playerList;

    private HashMap<Player, Integer> highScoresGame;
    private HashMap<Player, Integer> highScoresTotal;

    private PuzzleService puzzleService;
    // Getters and Setters

    @Autowired
    public GameMaster(PuzzleService puzzleService) {
        this.puzzleService = puzzleService;
        this.playerList = new HashSet<>();
        this.StartGame();
    }

    public HashMap<Player, Integer> getHighScoresGame() {
        return highScoresGame;
    }

    public void setHighScoresGame(HashMap<Player, Integer> highScoresGame) {
        this.highScoresGame = highScoresGame;
    }

    public HashMap<Player, Integer> getHighScoresTotal() {
        return highScoresTotal;
    }

    public void setHighScoresTotal(HashMap<Player, Integer> highScoresTotal) {
        this.highScoresTotal = highScoresTotal;
    }

    public Puzzle getPuzzle() {
        return puzzle;
    }

    public void setPuzzle(Puzzle puzzle) {
        this.puzzle = puzzle;
    }
    public String getGameState() {
        return gameState;
    }

    public void setGameState(String gameState) {
        this.gameState = gameState;
    }

    public int getRemainingTime() {
        return this.remainingTime;
    }

    public void setRemainingTime(int remainingTime) {
        this.remainingTime = remainingTime;
    }

    // Methods
    public void StartGame() {
        this.puzzle = puzzleService.queryPuzzle(0);
        this.gameState = "STARTED";
        // TODO implement here
        // create a GameData object for each user
        for (Player player : playerList) {
            player.setGameData(new PlayerGameData());
        }
    }

    public void EndGame() {
        this.gameState = "ENDED";
        for (Player player : playerList) {
            player.setGameData(null);
        }
        // TODO implement here
    }

    public void GetUserScore(String playerName, int score) {
        // TODO implement here
    }

    public void SetUserScore(String playerName, int score) {
        // TODO implement here
    }

    public void TimeOut() {
        // TODO implement here
    }

    public void AddPlayer(Player player) {
        // TODO implement here
        playerList.add(player);
    }

    public void RemovePlayer(Player player) {
        // TODO implement here
    }

}
