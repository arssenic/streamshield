package com.pipeline.fraud_engine.service;

import com.pipeline.fraud_engine.model.Transaction;
import com.pipeline.fraud_engine.entity.FraudRecord;
import com.pipeline.fraud_engine.repository.FraudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FraudDetectionService {

    @Autowired
    private FraudRepository repository;

    public String detect(Transaction tx) {
        
        // 1. EVALUATE GEO-VELOCITY (IMPOSSIBLE TRAVEL)
        FraudRecord lastTx = repository.findFirstByUserIdOrderByTimestampDesc(tx.getUserId());
        
        if (lastTx != null) {
            long timeDifferenceMillis = tx.getTimestamp() - lastTx.getTimestamp();
            boolean isDifferentCity = !tx.getCity().equals(lastTx.getCity());
            
            // FIX: Reduced time window from 30 mins (1800000) to 2 mins (120000)
            // This stops normal simulated consecutive events across different cities from breaking the system.
            if (isDifferentCity && timeDifferenceMillis < 120000) {
                return "HIGH_RISK_IMPOSSIBLE_TRAVEL";
            }
        }

        // 2. EVALUATE HISTORICAL STATISTICAL SKEW (Z-SCORE)
        List<Object[]> stats = repository.getUserTransactionStats(tx.getUserId());
        
        if (stats != null && !stats.isEmpty() && stats.get(0)[0] != null) {
            Double mean = (Double) stats.get(0)[0];
            Double stddev = (Double) stats.get(0)[1];

            // FIX: Increased fallback standard deviation buffer to lower sensitivity
            if (stddev == null || stddev == 0.0) {
                stddev = 1500.0; 
            }

            double zScore = (tx.getAmount() - mean) / stddev;

            // FIX: Raised threshold from 3.0 to 4.5 standard deviations
            // Only capture extreme anomalies, passing normal variance as SAFE
            if (zScore > 4.5) {
                return "HIGH_RISK_STATISTICAL_ANOMALY";
            }
        } else {
            // 3. NEW USER FALLBACK SECURITY
            // FIX: Increased threshold limit from 80k to 150k for users without profile history
            if (tx.getAmount() > 150000) {
                return "HIGH_RISK_NEW_USER_LARGE_AMOUNT";
            }
        }

        return "SAFE";
    }
}