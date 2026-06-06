package com.pipeline.fraud_engine.service;

import com.pipeline.fraud_engine.entity.FraudRecord;
import com.pipeline.fraud_engine.repository.FraudRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FraudQueryService {

    private final FraudRepository repository;

    public FraudQueryService(
            FraudRepository repository
    ){
        this.repository = repository;
    }

    public List<FraudRecord> getAll(){

        return repository.findAll();
    }

    public long count(){

        return repository.count();
    }
}