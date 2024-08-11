package com.lafhane.lafhaneserverjava.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Document(collection = "puzzles")
public class Puzzle {
    @Id
    private ObjectId id;
    private String letters; //"SZRSKKRSZSZKSSRSSZKRRSKZS" = ["SZRSK", "KRSZS", "ZKSSR", "SSZKR", "RSKZS]
    private List<String> answersList; // <word, point> {"SZRSK": 1, "KRSZS": 2, "ZKSSR": 3, "SSZKR": 4,


    public Puzzle(String letters, List<String> answersList) {
        this.letters = letters;
        this.answersList = answersList;
    }

    public String getLetters() {
        return letters;
    }

    public void setLetters(String letters) {
        this.letters = letters;
    }

    public List<String> getAnswersList() {
        return answersList;
    }

    public void setAnswersList(List<String> answersList) {
        this.answersList = answersList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Puzzle puzzle)) return false;
        return Objects.equals(letters, puzzle.letters) && Objects.equals(answersList, puzzle.answersList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(letters, answersList);
    }
}

