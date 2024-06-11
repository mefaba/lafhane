package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.config.WebSocketConfig;
import com.lafhane.lafhaneserverjava.enums.GAMESTATE;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.lafhane.lafhaneserverjava.services.CountdownService;
import com.lafhane.lafhaneserverjava.services.PuzzleService;
import com.lafhane.lafhaneserverjava.services.ScoreService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.UUID;

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
    private ScoreService scoreService;
    private WebSocketConfig.WebSocketHandler webSocketHandler;

    //CONSTRUCTOR
    @Autowired
    public GameMaster(PuzzleService puzzleService, ScoreService scoreService, WebSocketConfig.WebSocketHandler webSocketHandler){
        this.playerList = new HashSet<>();
        this.puzzleService = puzzleService;
        this.scoreService = scoreService;
        this.webSocketHandler = webSocketHandler;
    }

    public Player getPlayer(String username) {
        for (Player player : playerList) {
            if (player.getUsername().contains(username)) {
                return player;
            }
        }
        return null;
    }

    public boolean checkAnswer(String answer) {
        return this.puzzle.getAnswersList().contains(answer);
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
            //player.getGameData().reset();
        }
        //Start CountDown
        webSocketHandler.broadcastMessage(this.gameState.toString());
    }

    public void EndGame() {
        //savePlayerGames
        scoreService.saveScores(playerList, gameID);

        //update total scores

        //update game scores

        for (Player player : playerList) {
            //player.getGameData().reset();
        }

        // TODO implement here
    }

    public void StartLobby() {
        this.gameState = GAMESTATE.IN_LOBBY;
        webSocketHandler.broadcastMessage(this.gameState.toString());
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

    // xxx:  Getters and Setters
    public Puzzle getPuzzle() {
        return puzzle;
    }

    public void setPuzzle(Puzzle puzzle) {
        this.puzzle = puzzle;
    }

    public int getRemainingTime() {
        return remainingTime;
    }

    public void setRemainingTime(int remainingTime) {
        this.remainingTime = remainingTime;
    }

    public String getGameID() {
        return gameID;
    }

    public void setGameID(String gameID) {
        this.gameID = gameID;
    }

    public HashSet<Player> getPlayerList() {
        return playerList;
    }

    public void setPlayerList(HashSet<Player> playerList) {
        this.playerList = playerList;
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

    public GAMESTATE getGameState() {
        return gameState;
    }

    public void setGameState(GAMESTATE gameState) {
        this.gameState = gameState;
    }
}
