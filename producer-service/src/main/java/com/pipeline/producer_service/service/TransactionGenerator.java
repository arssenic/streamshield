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

    String[] cities = {"Delhi", "Mumbai", "Bangalore", "Patna", "Gaya", "Hyderabad", "Chennai"};

    @Scheduled(fixedRate = 3000)

    public void generate(){

        String randomCity = cities[random.nextInt(cities.length)];
        int randomAge = 18 + random.nextInt(58);

        Transaction tx =
                new Transaction(

                        UUID.randomUUID().toString(),

                        "user" + random.nextInt(5),

                        random.nextDouble() * 100000,

                        randomCity,
                        
                        randomAge,

                        System.currentTimeMillis()

                );

        producer.send(tx);

    }
}