package com.pipeline.producer_service.service;

import com.pipeline.producer_service.model.Transaction;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.kafka.core.KafkaTemplate;

import org.springframework.stereotype.Service;

@Service
public class TransactionProducer {

    @Autowired
    private KafkaTemplate<String, Transaction> kafkaTemplate;

    public void send(Transaction tx){

        kafkaTemplate.send(
                "transactions",
                tx.getUserId(),
                tx
        );

        System.out.println(
                "Sent -> " + tx
        );
    }
}