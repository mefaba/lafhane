package com.lafhane.lafhaneserverjava.repository;

import com.lafhane.lafhaneserverjava.models.Score;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScoreRepository extends MongoRepository<Score, String> {
}
