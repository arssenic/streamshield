package com.pipeline.fraud_engine.repository;

import com.pipeline.fraud_engine.entity.FraudRecord;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FraudRepository
        extends JpaRepository<FraudRecord,String> {
}