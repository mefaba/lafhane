package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.config.WebSocketConfig;
import com.lafhane.lafhaneserverjava.enums.GAMESTATE;
import com.lafhane.lafhaneserverjava.models.PlayerGameData;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.lafhane.lafhaneserverjava.services.CountDownTimerService;
import com.lafhane.lafhaneserverjava.services.PuzzleService;
import com.lafhane.lafhaneserverjava.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class GameMaster {
    private Puzzle puzzle;
    private GAMESTATE gameState; // play, lobby
    private int remainingTime;

    private String gameID;
    private HashSet<Player> playerList;

    private HashMap<Player, Integer> highScoresGame;
    private HashMap<Player, Integer> highScoresTotal;

    private PuzzleService puzzleService;
    private CountDownTimerService countDownTimerService;

    private ScoreService scoreService;


    private WebSocketConfig.WebSocketHandler webSocketHandler;
    // Getters and Setters

    //CONSTRUCTOR
    @Autowired
    public GameMaster(PuzzleService puzzleService, CountDownTimerService countDownTimerService, ScoreService scoreService, WebSocketConfig.WebSocketHandler webSocketHandler){
        this.playerList = new HashSet<>();
        this.puzzleService = puzzleService;
        this.countDownTimerService = countDownTimerService;
        this.scoreService = scoreService;
        this.webSocketHandler = webSocketHandler;
    }

    //GETTERS AND SETTERS
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

    public Player getPlayer(String username) {
        for (Player player : playerList) {
            if (player.getUsername().contains(username)) {
                return player;
            }
        }
        return null;
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


    public String getGameID() {
        return gameID;
    }

    private void setGameID(String gameID) {
        this.gameID = gameID;
    }

    // METHODS
    public void StartGame() {
        this.puzzle = puzzleService.queryPuzzle(0);
        this.gameState = GAMESTATE.IN_PLAY;

        //generate new game id
        this.gameID = UUID.randomUUID().toString();
        // TODO implement here
        // Initiate GameData object for each user
        for (Player player : playerList) {
            player.getGameData().reset();
        }
        //Start CountDown
        webSocketHandler.broadcastMessage(this.getGameState().toString());
        this.startCountdown(180);
    }

    public void EndGame() {
        //savePlayerGames
        scoreService.saveScores(playerList, gameID);

        //update total scores

        //update game scores

        for (Player player : playerList) {
            player.getGameData().reset();
        }

        // TODO implement here
    }

    public void StartLobby() {
        this.gameState = GAMESTATE.IN_LOBBY;
        webSocketHandler.broadcastMessage(this.getGameState().toString());
        //Start CountDown
        this.startCountdown(60);

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
