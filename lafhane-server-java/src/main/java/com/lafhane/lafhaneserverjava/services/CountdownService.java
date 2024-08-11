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

    private int gameTime = 180;  // 3 minutes for game
    private int lobbyTime = 0;  // 1 minute for lobby
    private boolean gameInPlay = false;

    @Scheduled(fixedRate = 1000)
    public void countdown() {
        if (gameInPlay) {
            gameTime--;
            if (gameTime < 0) {
                gameInPlay = false;
                lobbyTime = 60;
                gameMaster.EndGame();
                gameMaster.StartLobby();
                logger.info("Game in Lobby");
            }
        } else {
            lobbyTime--;
            if (lobbyTime < 0) {
                gameInPlay = true;
                gameTime = 180;
                gameMaster.StartGame();
                logger.info("Game in Play");
            }
        }
        gameMaster.countdownServiceTimeSync(this.getRemainingTime());
        // Update clients with the current countdown state
    }


    //@Scheduled(fixedDelay = 10 * 1000)
    public void scheduleDeliverDataTask() {
        try {

        } catch (JSONException e) {
            // Log the error or handle it appropriately
            logger.error("Error creating JSON message", e);
        }
    }

    public int getRemainingTime(){
        return gameInPlay ? gameTime : lobbyTime;
    }
}

