package com.lafhane.lafhaneserverjava.models;

import org.bson.Document;

import java.util.Objects;

@org.springframework.data.mongodb.core.mapping.Document(collection = "players")
public class Player {
    private String id;
    private String username;
    public final PlayerGameData gameData;

    public Player(String username) {
        this.username = username;
        this.gameData = new PlayerGameData();
    }


    public String getUsername() {
        return username;
    }

    public void setUserName(String name) {
        // Add validation code here: required
        if (name != null && !name.isEmpty()) {
            this.username = name;
        } else {
            throw new IllegalArgumentException("Invalid username");
        }
    }

    public PlayerGameData getGameData() {
        return gameData;
    }

    public Document toDocument() {
        Document doc = new Document()
                .append("username", this.username);
        return doc;
    }

    // Utility Methods

    /*
     * equals() and hashcode() functions overriddn to make hashset playerList
     * variable inside GameMaster to work properly.
     * If not overriden, hashset will not be able to compare two player objects and
     * will add same player multiple times.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Player player = (Player) o;
        return Objects.equals(username, player.username);
    }

    /*
     * equals() and hashcode() functions overriddn to make hashset playerList
     * variable inside GameMaster to work properly.
     * If not overriden, hashset will not be able to compare two player objects and
     * will add same player multiple times.
     */
    @Override
    public int hashCode() {
        return Objects.hash(username);
    }
}
