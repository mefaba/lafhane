package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.enums.GAMESTATE;
import com.lafhane.lafhaneserverjava.models.PlayerGameData;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.lafhane.lafhaneserverjava.services.CountDownTimerService;
import com.lafhane.lafhaneserverjava.services.PuzzleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class GameMaster {
    private Puzzle puzzle;
    private GAMESTATE gameState; // play, lobby
    private int remainingTime;
    private HashSet<Player> playerList;

    private HashMap<Player, Integer> highScoresGame;
    private HashMap<Player, Integer> highScoresTotal;

    private PuzzleService puzzleService;
    private CountDownTimerService countDownTimerService;
    // Getters and Setters

    @Autowired
    public GameMaster(PuzzleService puzzleService, CountDownTimerService countDownTimerService) {
        this.playerList = new HashSet<>();
        this.puzzleService = puzzleService;
        this.countDownTimerService = countDownTimerService;
   
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
    public GAMESTATE getGameState() {
        return gameState;
    }

    public void setGameState(GAMESTATE gameState) {
        this.gameState = gameState;
    }



    // Methods
    public void StartGame() {
        this.puzzle = puzzleService.queryPuzzle(0);
        // TODO implement here
        // create a GameData object for each user
        for (Player player : playerList) {
            player.setGameData(new PlayerGameData());
        }
    }

    public void EndGame() {
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

    public void changeGameState(GAMESTATE state) {
        this.gameState = state;
    }
   
 
    public int getRemainingTime() {
        return countDownTimerService.getTimeLeft();
    }

    public void setRemainingTime(int remainingTime) {
        countDownTimerService.setTimeLeft(remainingTime);
    }

    public void startCountdown(int time) {
        countDownTimerService.resetTimer();
        countDownTimerService.startTimer(time);
    }
}
