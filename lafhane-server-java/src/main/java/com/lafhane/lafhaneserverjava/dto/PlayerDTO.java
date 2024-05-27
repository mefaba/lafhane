package com.lafhane.lafhaneserverjava.dto;

public class PlayerDTO {
    /**
     * The name of the player.
     */
    private String username;

    // getters and setters

    public PlayerDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}