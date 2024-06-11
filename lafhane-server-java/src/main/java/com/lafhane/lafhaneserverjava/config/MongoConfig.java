package com.lafhane.lafhaneserverjava.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Autowired
    private Environment env;

    @Bean
    public MongoClient mongoClient() {
        String connectionString = env.getProperty("DB_URI");
        return com.mongodb.client.MongoClients.create(connectionString);
    }

    @Override
    protected String getDatabaseName() {
        return "lafhane";
    }
}