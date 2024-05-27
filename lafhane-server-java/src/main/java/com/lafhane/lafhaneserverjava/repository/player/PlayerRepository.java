package com.lafhane.lafhaneserverjava.repository.player;


import com.lafhane.lafhaneserverjava.models.Player;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
interface CustomizedPlayerRepository {

}

class CustomizedPlayerRepositoryImpl implements CustomizedPlayerRepository {
    @Resource
    MongoTemplate mongoTemplate;



}

public interface PlayerRepository extends CrudRepository<Player, Long>, CustomizedPlayerRepository {

    // Declare query methods here
}


