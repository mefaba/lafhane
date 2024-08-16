package com.lafhane.lafhaneserverjava.services;

import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PuzzleService {
    private static final Logger logger = LoggerFactory.getLogger(PuzzleService.class);
    private Puzzle puzzle;
    private int puzzleIndex;
    private long puzzleCount;
    @Autowired
    private MongoClient mongoClient;
    private MongoCollection<Document> collection;

    //CONSTRUCTOR
    @Autowired
    public  PuzzleService(MongoClient mongoClient) {
        this.collection = mongoClient.getDatabase("lafhane").getCollection("puzzles");
        this.puzzleIndex = 20;
        this.puzzleCount =  this.collection.countDocuments();
    }

    // Methods
    public Puzzle queryPuzzle() {
        logger.info("Querying puzzle: {}", this.puzzleIndex);
        if(puzzleIndex >= puzzleCount){
            this.puzzleIndex = 0;
        }
        int index = puzzleIndex;
        Document doc = this.collection.find().skip(index).limit(1).first();
        String letters = doc.getString("letters");
        List<String> answers = doc.getList("answersList", String.class);
        this.puzzle = new Puzzle(letters, answers);
        //increase index for next query
        puzzleIndex++;
        return this.puzzle;
    }
}
