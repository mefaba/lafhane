package com.lafhane.lafhaneserverjava.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "players")
public class Player {
    @Id
    private ObjectId id;
    private String username;
    private String password;
    private String gameDataId;

    public Player(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGameDataId() {
        return gameDataId;
    }

    public void setGameDataId(String gameDataId) {
        this.gameDataId = gameDataId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
