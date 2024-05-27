package com.lafhane.lafhaneserverjava.services;

import com.lafhane.lafhaneserverjava.models.Puzzle;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PuzzleService {
    private MongoClient mongoClient;
    private MongoCollection<Document> collection;
    @Autowired
    public void PuzzleService(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
        this.collection = mongoClient.getDatabase("lafhane").getCollection("puzzles");
        // TODO implement here
    }
    public Puzzle queryPuzzle(int index) {
        // TODO implement here
        Document doc = collection.find().skip(index).limit(1).first();
        Puzzle puzzle = new Puzzle(doc.getString("letters"), doc.getList("answers", String.class));
        return puzzle;
    }
}
