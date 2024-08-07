package com.lafhane.lafhaneserverjava.repository;

import com.lafhane.lafhaneserverjava.models.LiveData;
import com.mongodb.client.result.UpdateResult;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LiveDataRepository extends MongoRepository<LiveData, String> {
    Optional<LiveData> findByPlayerId(ObjectId playerId);

    @Query("{ 'playerId': ?0 }")
    @Update("{ '$addToSet': { 'correctAnswers': ?1 }, '$inc': { 'score': ?2 } }")
    void updateLiveData(ObjectId playerId, String answer, int score);
}
