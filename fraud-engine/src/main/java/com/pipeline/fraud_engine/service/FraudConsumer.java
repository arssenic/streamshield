package com.pipeline.fraud_engine.service;

import com.pipeline.fraud_engine.model.Transaction;

import com.pipeline.fraud_engine.repository.FraudRepository;

import com.pipeline.fraud_engine.entity.FraudRecord;

import org.springframework.kafka.annotation.KafkaListener;

import org.springframework.stereotype.Component;

import org.springframework.beans.factory.annotation.Autowired;

@Component
public class FraudConsumer {

    @Autowired
    FraudDetectionService fraudService;

    @Autowired
    FraudRepository repository;

    @KafkaListener(topics="transactions")

    public void consume(Transaction tx){

        String result =
                fraudService.detect(tx);

        FraudRecord record =
                new FraudRecord(

                        tx.getTransactionId(),

                        tx.getUserId(),

                        tx.getAmount(),

                        tx.getCity(),   
                        
                        tx.getAge(),

                        result,

                        tx.getTimestamp()
                );

        repository.save(record);

        System.out.println(

                "Saved -> "

                + result
        );
    }
}