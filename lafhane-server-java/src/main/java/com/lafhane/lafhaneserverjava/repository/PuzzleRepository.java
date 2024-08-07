package com.lafhane.lafhaneserverjava.repository;

import com.lafhane.lafhaneserverjava.models.Puzzle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PuzzleRepository extends MongoRepository<Puzzle, String> {
    // Declare query methods here
}
