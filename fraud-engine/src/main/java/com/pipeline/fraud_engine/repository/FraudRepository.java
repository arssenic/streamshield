package com.pipeline.fraud_engine.repository;

import com.pipeline.fraud_engine.entity.FraudRecord;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FraudRepository
        extends JpaRepository<FraudRecord,String>{

    List<FraudRecord>
    findByStatus(String status);

    List<FraudRecord>
    findByUserId(String userId);

}