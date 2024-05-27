package com.lafhane.lafhaneserverjava.models;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Puzzle {
    private String letters; //"SZRSKKRSZSZKSSRSSZKRRSKZS" = ["SZRSK", "KRSZS", "ZKSSR", "SSZKR", "RSKZS]

    private HashMap<String, Integer> answersHashMap; // word, point {"SZRSK": 1, "KRSZS": 2, "ZKSSR": 3, "SSZKR": 4,
                                                     // "RSKZS": 5}
    public Puzzle(String letters, List<String> answers) {
        this.answersHashMap = new HashMap<>();
        this.letters = letters;
        this.generateAnswerHashMap(answers);
    }

    // Getters and Setters
    public String getLetters() {
        return letters;
    }


    public void setLetters(String letters) {
        this.letters = letters;
    }
    public String toString() {
        return letters;
    }


    // Methods
    public boolean checkAnswer(String answer) {
        return answersHashMap.containsKey(answer);
    }

    public int getAnswerPoint(String answer) {
        return answersHashMap.get(answer);
    }

    private void generateAnswerHashMap(List<String> answers) {
        // TODO implement ALGORITHM here
        //answersHashMap.put("sil",  "sil".length()*2-3);
        int score;
        for (int i = 0; i < answers.size(); i++) {
            score = (answers.get(i).length() * 2-3);
            answersHashMap.put(answers.get(i), score);
        }
        answersHashMap.put("sil",  "sil".length()*2-3);
    }
}
