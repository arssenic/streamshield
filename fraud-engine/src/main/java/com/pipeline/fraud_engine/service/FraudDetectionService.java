package com.pipeline.fraud_engine.service;

import com.pipeline.fraud_engine.model.Transaction;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FraudDetectionService {

    Map<String,List<Long>> userTransactions =
            new HashMap<>();

    public String detect(Transaction tx){

        if(tx.getAmount() > 50000){

            return "HIGH_AMOUNT";
        }

        long now = System.currentTimeMillis();

        userTransactions.putIfAbsent(
                tx.getUserId(),
                new ArrayList<>()
        );

        List<Long> timestamps =
                userTransactions.get(
                        tx.getUserId()
                );

        timestamps.add(now);

        timestamps.removeIf(
                time -> now - time > 60000
        );

        if(timestamps.size() > 5){

            return "TOO_MANY_TX";
        }

        return "SAFE";
    }
}