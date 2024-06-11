package com.lafhane.lafhaneserverjava.repository;


import com.lafhane.lafhaneserverjava.models.Player;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends MongoRepository<Player, String> {
    Optional<Player> findByUsername(String username);
    // Declare query methods here
}


