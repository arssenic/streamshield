package com.pipeline.fraud_engine.service;

import com.pipeline.fraud_engine.model.Transaction;

import org.springframework.kafka.annotation.KafkaListener;

import org.springframework.stereotype.Component;

import org.springframework.beans.factory.annotation.Autowired;

@Component
public class FraudConsumer {

    @Autowired
    FraudDetectionService fraudService;

    @KafkaListener(
            topics="transactions"
    )

    public void consume(Transaction tx){

        String result =
                fraudService.detect(tx);

        System.out.println(

                "USER: "
                + tx.getUserId()

                + " STATUS: "

                + result
        );
    }
}