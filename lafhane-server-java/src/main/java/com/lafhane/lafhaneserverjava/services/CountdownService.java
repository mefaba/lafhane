package com.lafhane.lafhaneserverjava.services;


import com.lafhane.lafhaneserverjava.GameMaster;
import com.lafhane.lafhaneserverjava.config.WebSocketConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class CountdownService {

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
            if (gameTime <= 0) {
                gameInPlay = false;
                lobbyTime = 60;
                // Notify clients game over, send final scores, etc.
                //END GAME  && START LOBBY
                gameMaster.EndGame();
                gameMaster.StartLobby();
                System.out.println("[DEBUG]: game lobby");

            }
        } else {
            lobbyTime--;
            if (lobbyTime <= 0) {
                gameInPlay = true;
                gameTime = 180;
                // Notify clients new game started, reset scores, etc.
                //START GAME
                gameMaster.StartGame();
                System.out.println("[DEBUG]: game started");

            }
        }
        // Update clients with the current countdown state
    }


    @Scheduled(fixedDelay = 10 * 1000)
    public void scheduleTask3() {
        if(gameMaster.getGameState() != null)
        {
            webSocketHandler.broadcastMessage(gameMaster.getGameState().toString());
        }
    }


    public int getRemainingTime(){
        if(gameInPlay)
        {
            return  gameTime;
        }
        else{
            return lobbyTime;
        }
    }
}
