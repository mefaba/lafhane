package com.lafhane.lafhaneserverjava.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;


@Document
public class PlayerGameData {
    @Id
    private ObjectId id;
    private int currentGameScore;
    private String[]  currentGameCorrectAnswers;
    private int totalScore;
}
