package com.pipeline.producer_service.service;

import com.pipeline.producer_service.model.Transaction;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.scheduling.annotation.Scheduled;

import org.springframework.stereotype.Component;

import java.util.Random;
import java.util.UUID;

@Component
public class TransactionGenerator {

    @Autowired
    TransactionProducer producer;

    Random random = new Random();

    String[] cities = {"Delhi", "Mumbai", "Bangalore", "Patna", "Gaya", "Hyderabad", "Chennai","Kolkata", "Lucknow", "Kanpur","Pune"};

    @Scheduled(fixedRate = 3000)
    public void generate(){
        String randomCity = cities[random.nextInt(cities.length)];
        int randomAge = 18 + random.nextInt(58);
        String userId = "user" + random.nextInt(50); 

        double amount = 10 + (random.nextDouble() * 1990); 

        int chance = random.nextInt(100);
        if (chance > 94) {
            amount = 50000 + (random.nextDouble() * 50000); 
        }

        Transaction tx = new Transaction(
                UUID.randomUUID().toString(),
                userId,
                amount,
                randomCity,
                randomAge,
                System.currentTimeMillis()
        );
        producer.send(tx);
    }
}