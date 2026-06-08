package com.pipeline.fraud_engine.repository;

import com.pipeline.fraud_engine.entity.FraudRecord;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FraudRepository
        extends JpaRepository<FraudRecord,String>{

    FraudRecord findFirstByUserIdOrderByTimestampDesc(String userId);

    @Query("SELECT AVG(f.amount) as mean, STDDEV(f.amount) as stddev FROM FraudRecord f WHERE f.userId = :userId AND f.status = 'SAFE'")
    List<Object[]> getUserTransactionStats(@Param("userId") String userId);

    List<FraudRecord>
    findByStatus(String status);

    List<FraudRecord>
    findByUserId(String userId);

}
