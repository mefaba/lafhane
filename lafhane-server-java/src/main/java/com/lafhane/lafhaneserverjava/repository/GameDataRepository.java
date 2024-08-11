package com.lafhane.lafhaneserverjava.repository;

import com.lafhane.lafhaneserverjava.models.GameDataRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameDataRepository extends MongoRepository<GameDataRecord, String> {
}

