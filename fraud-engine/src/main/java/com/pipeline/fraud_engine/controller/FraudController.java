package com.pipeline.fraud_engine.controller;

import com.pipeline.fraud_engine.entity.FraudRecord;

import com.pipeline.fraud_engine.repository.FraudRepository;

import com.pipeline.fraud_engine.service.FraudQueryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/frauds")

public class FraudController {

    private final FraudRepository repository;

    private final FraudQueryService service;

    public FraudController(

            FraudRepository repository,

            FraudQueryService service){

        this.repository = repository;

        this.service = service;
    }

    @GetMapping

    public List<FraudRecord> all(){

        return service.getAll();
    }

    @GetMapping("/count")

    public long count(){

        return service.count();
    }

    @GetMapping("/high-risk")

    public List<FraudRecord> risky(){

        return repository.findByStatus(
                "HIGH_AMOUNT"
        );
    }

    @GetMapping("/user/{id}")

    public List<FraudRecord> user(

            @PathVariable String id){

        return repository.findByUserId(id);
    }
}