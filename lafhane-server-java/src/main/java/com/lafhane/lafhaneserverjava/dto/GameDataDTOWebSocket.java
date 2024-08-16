package com.lafhane.lafhaneserverjava.dto;

import com.google.gson.Gson;
import org.bson.types.ObjectId;

public class GameDataDTOWebSocket {
    private int remainingTime;
    private String gameState;

    public GameDataDTOWebSocket(int remainingTime, String gameState) {
        this.remainingTime = remainingTime;
        this.gameState = gameState;
    }

    public String toJson(){
        return new Gson().toJson(this);
    }
}
