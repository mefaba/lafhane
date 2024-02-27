package com.lafhane.lafhaneserverjava.models;

import java.util.HashMap;
import java.util.List;

public class Puzzle {
    private String puzzle; // ["SZRSK", "KRSZS", "ZKSSR", "SSZKR", "RSKZS]
    private List<String> answerList;
    private HashMap<String, Integer> answersHashMap; // word, point {"SZRSK": 1, "KRSZS": 2, "ZKSSR": 3, "SSZKR": 4,
                                                     // "RSKZS": 5}

    public Puzzle(String puzzle) {
        this.puzzle = puzzle;
    }

    // Getters and Setters
    public String getPuzzle() {
        return puzzle;
    }

    public void setPuzzle(String puzzle) {
        this.puzzle = puzzle;
        generateAnswerList(puzzle);
    }

    public List<String> getAnswerList() {
        return answerList;
    }

    // Methods
    public boolean checkAnswer(String answer) {
        // TODO implement here
        return false;
    }

    private void generateAnswerList(String puzzle) {
        // TODO implement here
    }
}
