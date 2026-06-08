package com.pipeline.producer_service.service;

import com.pipeline.producer_service.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@Component
public class TransactionGenerator {

    @Autowired
    TransactionProducer producer;

    Random random = new Random();

    String[] cities = {"Delhi", "Mumbai", "Bangalore", "Patna", "Gaya", "Hyderabad", "Chennai","Kolkata", "Lucknow", "Kanpur","Pune"};

    private Map<String, String> userCityMap = new HashMap<>();

    @Scheduled(fixedRate = 3000)
    public void generate(){
        String userId = "user" + random.nextInt(50); 
        int randomAge = 18 + random.nextInt(58);

        String randomCity;
        if (!userCityMap.containsKey(userId)) {
            randomCity = cities[random.nextInt(cities.length)];
            userCityMap.put(userId, randomCity);
        } else {
            if (random.nextInt(100) > 97) {
                randomCity = cities[random.nextInt(cities.length)]; 
                userCityMap.put(userId, randomCity);
            } else {
                randomCity = userCityMap.get(userId); 
            }
        }

        double amount = 10 + (random.nextDouble() * 1990); 

        int chance = random.nextInt(100);
        if (chance > 97) {
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