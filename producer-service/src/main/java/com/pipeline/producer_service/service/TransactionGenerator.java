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

    @Scheduled(fixedRate = 3000)

    public void generate(){

        Transaction tx =
                new Transaction(

                        UUID.randomUUID().toString(),

                        "user" + random.nextInt(3),

                        random.nextDouble() * 100000,

                        "Delhi",

                        System.currentTimeMillis()

                );

        producer.send(tx);

    }
}