package com.lafhane.lafhaneserverjava.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class MongoConfig {

    @Autowired
    private Environment env;

    @Bean
    public MongoClient mongoClient() {
        String uri = env.getProperty("DB_URI");

        try {
            MongoClient mongoClient = MongoClients.create(uri);
            return mongoClient;
        } catch (Exception e) {
            System.out.println("Error while connecting to MongoDB: " + e.getMessage());
            return null;
        }
    }

}