package com.lafhane.lafhaneserverjava.repository;

import com.lafhane.lafhaneserverjava.models.GameData;
import com.lafhane.lafhaneserverjava.models.Player;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameDataRepository extends MongoRepository<GameData, String> {
}

