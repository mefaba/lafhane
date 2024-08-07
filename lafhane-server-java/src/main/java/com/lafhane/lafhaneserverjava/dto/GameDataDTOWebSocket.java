package com.lafhane.lafhaneserverjava.dto;

import com.google.gson.Gson;
import org.bson.types.ObjectId;

public class GameDataDTOWebSocket {
    private int remainingTime;
    private String gameState;
    private String gameId;

    public GameDataDTOWebSocket(int remainingTime, String gameState, String gameId) {
        this.remainingTime = remainingTime;
        this.gameState = gameState;
        this.gameId = gameId;
    }

    public String toJson(){
        return new Gson().toJson(this);
    }
}
