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
        
        // 1. Impossible Travel Check (Geo-Velocity)
        FraudRecord lastTx = repository.findFirstByUserIdOrderByTimestampDesc(tx.getUserId());
        
        if (lastTx != null) {
            long timeDifferenceMillis = tx.getTimestamp() - lastTx.getTimestamp();
            boolean isDifferentCity = !tx.getCity().equals(lastTx.getCity());
            
            // If they changed cities in under 30 minutes (1,800,000 ms), it's physically impossible
            if (isDifferentCity && timeDifferenceMillis < 1800000) {
                return "HIGH_RISK_IMPOSSIBLE_TRAVEL";
            }
        }

        // 2. Statistical Anomaly Check (Z-Score)
        List<Object[]> stats = repository.getUserTransactionStats(tx.getUserId());
        
        if (stats != null && !stats.isEmpty() && stats.get(0)[0] != null) {
            Double mean = (Double) stats.get(0)[0];
            Double stddev = (Double) stats.get(0)[1];

            // Default safe baseline if they only have 1 previous transaction (stddev is 0)
            if (stddev == null || stddev == 0.0) {
                stddev = 500.0; 
            }

            // Calculate Z-Score: z = (x - μ) / σ
            double zScore = (tx.getAmount() - mean) / stddev;

            // Statistically, 99.7% of normal data falls within 3 standard deviations.
            if (zScore > 3.0) {
                return "HIGH_RISK_STATISTICAL_ANOMALY";
            }
        } else {
            // Fallback for brand new users with no history
            if (tx.getAmount() > 80000) {
                return "HIGH_RISK_NEW_USER_LARGE_AMOUNT";
            }
        }

        return "SAFE";
    }
}