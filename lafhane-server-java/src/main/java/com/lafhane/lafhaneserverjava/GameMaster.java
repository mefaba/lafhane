package com.lafhane.lafhaneserverjava;

import com.lafhane.lafhaneserverjava.config.WebSocketConfig;
import com.lafhane.lafhaneserverjava.dto.GameDataDTOWebSocket;
import com.lafhane.lafhaneserverjava.enums.GAMESTATE;
import com.lafhane.lafhaneserverjava.models.GameDataRecord;
import com.lafhane.lafhaneserverjava.models.LiveData;
import com.lafhane.lafhaneserverjava.models.Player;
import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.lafhane.lafhaneserverjava.services.PlayerService;
import com.lafhane.lafhaneserverjava.services.PuzzleService;
import com.lafhane.lafhaneserverjava.services.ScoreService;

import com.lafhane.lafhaneserverjava.types.PlayerScorePair;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class GameMaster {
    private static final Logger logger = LoggerFactory.getLogger(GameMaster.class);

    private Puzzle puzzle;
    AtomicReference<GAMESTATE> gameState = new AtomicReference<>(GAMESTATE.IN_PLAY);
    private int remainingTime;
    private HashSet<Player> playerList;
    private String gameID;
    private List<PlayerScorePair> playerScoresGame;
    private List<PlayerScorePair> playerScoresTotal;

    private GameDataRecord gameDataRecord;

    private PlayerService playerService;
    private PuzzleService puzzleService;
    private ScoreService scoreService;
    private WebSocketConfig.WebSocketHandler webSocketHandler;

    //CONSTRUCTOR
    @Autowired
    public GameMaster(PlayerService playerService, PuzzleService puzzleService, ScoreService scoreService, WebSocketConfig.WebSocketHandler webSocketHandler){
        this.playerService = playerService;
        this.playerList = new HashSet<>();
        this.puzzleService = puzzleService;
        this.scoreService = scoreService;
        this.webSocketHandler = webSocketHandler;
        this.playerScoresGame = new ArrayList<>();
        this.playerScoresTotal = new ArrayList<>();
    }

    public Player getPlayer(String username) {
        for (Player player : playerList) {
            if (player.getUsername().contains(username)) {
                return player;
            }
        }
        return null;
    }
    // METHODS


    public boolean handleAnswer(String answer) {
        try{
            Player player = playerService.getPlayer();
            boolean isAnswerCorrect = this.puzzle.getAnswersList().contains(answer);
            if (isAnswerCorrect) {
                scoreService.upsertLiveData(answer, player.getId());
            }
            return isAnswerCorrect;
        }catch (UsernameNotFoundException e){
            return false;
        }
        catch (Exception e) {
            logger.error("An error occurred while handling the answer: {}", e.getMessage());
            return false;
        }

    }

    public LiveData getLiveData(){
        Player player = playerService.getPlayer();
        LiveData liveData = scoreService.getLiveData(player.getId());
        if(liveData == null){
            liveData = new LiveData(player.getId());
        }
        return liveData;
    }

    //This function called every second by countdown service
    public void countdownServiceTimeSync(int remainingTime){
        this.setRemainingTime(remainingTime);
    }

    @Scheduled(fixedRate = 1 * 1000)
    public void deliverGameDataToPlayers(){
        //create game data message
        GameDataDTOWebSocket gameDataDTOWebSocket = new GameDataDTOWebSocket(
                this.getRemainingTime(),
                this.getGameState(),
                this.getGameID()
        );
        //broadcast game data message to every player
        webSocketHandler.broadcastMessage(gameDataDTOWebSocket);
    }


    public void StartGame() {
        /*Initialize new game variables*/
        this.setGameState(GAMESTATE.IN_PLAY);
        this.puzzle = puzzleService.queryPuzzle();
        this.gameID = new ObjectId().toString();
        this.gameDataRecord = new GameDataRecord(this.getGameID());

        //create game data message
        GameDataDTOWebSocket gameDataDTOWebSocket = new GameDataDTOWebSocket(
                this.getRemainingTime(),
                this.getGameState(),
                this.getGameID()
        );
        //broadcast game data message to every player
        webSocketHandler.broadcastMessage(gameDataDTOWebSocket);

        // TODO implement here
        for (Player player : playerList) {

        }
        //Start CountDown

    }

    public void EndGame() {
        //savePlayerGames
        scoreService.saveScores(gameID);

        //clean up
        scoreService.cleanAllLiveData();
    }

    public void StartLobby() {
        this.setGameState(GAMESTATE.IN_LOBBY);
        //create game data message to boarcast
        GameDataDTOWebSocket gameDataDTOWebSocket = new GameDataDTOWebSocket(
                this.getRemainingTime(),
                this.getGameState(),
                this.getGameID()
        );
        setPlayerScoresGame(scoreService.getTopPlayersInGame(this.getGameID()));

        setPlayerScoresTotal(scoreService.getTopPlayersInTotal());
        //create game data for rest api endpoint that will be used for getting game scores

        //broadcast game data message to every player
        webSocketHandler.broadcastMessage(gameDataDTOWebSocket);
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

    public List<PlayerScorePair> getPlayerScoresGame() {
        return playerScoresGame;
    }

    public void setPlayerScoresGame(List<PlayerScorePair> playerScoresGame) {
        this.playerScoresGame = playerScoresGame;
    }

    public List<PlayerScorePair> getPlayerScoresTotal() {
        return playerScoresTotal;
    }

    public void setPlayerScoresTotal(List<PlayerScorePair> playerScoresTotal) {
        this.playerScoresTotal = playerScoresTotal;
    }

    public GameDataRecord getGameDataRecord() {
        return gameDataRecord;
    }

    public void setGameDataRecord(GameDataRecord gameDataRecord) {
        this.gameDataRecord = gameDataRecord;
    }


    // xxx:  Getters and Setters
    public Puzzle getPuzzle() {
        return puzzle;
    }

    public List<String> grabPuzzleAnswersList() {
        if(gameState.get() == GAMESTATE.IN_LOBBY){
            return this.puzzle.getAnswersList();
        }else{
            return new ArrayList<>();
        }
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



    public String getGameState() {
        return gameState.get().toString();
    }

    public void setGameState(GAMESTATE gameState) {
        this.gameState.set(gameState);
    }
}
