package com.pipeline.fraud_engine.service;

import com.pipeline.fraud_engine.model.Transaction;

import org.springframework.kafka.annotation.KafkaListener;

import org.springframework.stereotype.Component;

@Component
public class FraudConsumer {

    @KafkaListener(
            topics = "transactions",
            groupId = "fraud-group"
    )

    public void consume(Transaction tx){

        System.out.println(
                "RECEIVED -> " + tx
        );
    }
}