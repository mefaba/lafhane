package com.lafhane.lafhaneserverjava.services;


import com.lafhane.lafhaneserverjava.GameMaster;
import com.lafhane.lafhaneserverjava.config.WebSocketConfig;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class CountdownService {
    private static final Logger logger = LoggerFactory.getLogger(CountdownService.class);


    @Autowired
    private WebSocketConfig.WebSocketHandler webSocketHandler;

    @Autowired
    private GameMaster gameMaster;

    private static final int GAME_DURATION = 180;  // 3 minutes for game
    private static final int LOBBY_DURATION = 60;  // 1 minute for lobby

    private int gameTime = GAME_DURATION;  // 3 minutes for game
    private int lobbyTime = 0;  // 1 minute for lobby
    private boolean gameInPlay = false;

    @Scheduled(fixedRate = 1000)
    public synchronized  void countdown() {
        if (gameInPlay) {
            gameTime--;
            if (gameTime <= 0) {
                switchToLobby();
            }
        } else {
            lobbyTime--;
            if (lobbyTime <= 0) {
                switchToGame();
            }
        }
        gameMaster.countdownServiceTimeSync(this.getRemainingTime());
    }

    public int getRemainingTime(){
        return gameInPlay ? gameTime : lobbyTime;
    }

    private void switchToLobby() {
        logger.info("switchToLobby");
        gameInPlay = false;
        lobbyTime = LOBBY_DURATION;
        gameMaster.EndGame();
        gameMaster.StartLobby();

    }

    private void switchToGame() {
        logger.info("switchToGame");
        gameInPlay = true;
        gameTime = GAME_DURATION;
        gameMaster.StartGame();

    }
}

