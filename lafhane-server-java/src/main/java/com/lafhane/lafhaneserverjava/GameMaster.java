package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.models.GameData;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Puzzle;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;

@Component
public class GameMaster {
    private Puzzle puzzle;
    private String gameState; // STARTED, ENDED
    private int remainingTime;
    private HashSet<Player> playerList;
    private List<Player> highScoreList;
    // Getters and Setters

    public GameMaster() {
        this.playerList = new HashSet<>();
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
        this.puzzle = new Puzzle("EZRA APCI FLEN  AOOS");
        this.gameState = "STARTED";
        // TODO implement here
        // create a GameData object for each user
        for (Player player : playerList) {
            player.setGameData(new GameData());
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
