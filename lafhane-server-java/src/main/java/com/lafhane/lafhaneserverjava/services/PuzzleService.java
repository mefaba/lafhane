package com.lafhane.lafhaneserverjava.services;

import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PuzzleService {
    private Puzzle puzzle;
    @Autowired
    private MongoClient mongoClient;

    private MongoCollection<Document> collection;

    //CONSTRUCTOR
    public void PuzzleService() {
        this.collection = mongoClient.getDatabase("lafhane").getCollection("puzzles");
        // TODO implement here
    }

    // Methods
    public Puzzle queryPuzzle(int index) {
        // TODO implement here
        Document doc = mongoClient.getDatabase("lafhane").getCollection("puzzles").find().skip(index).limit(1).first();
        String letters = doc.getString("letters");
        List<String> answers = doc.getList("answers", String.class);
        this.puzzle = new Puzzle(letters, answers);
        return this.puzzle;
    }





    public void generateAnswers(){

    }


}
