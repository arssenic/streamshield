package com.pipeline.fraud_engine.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "fraud_records")

public class FraudRecord {

    @Id
    private String transactionId;

    private String userId;

    private Double amount;

    private String city;
    
    private Integer age;

    private String status;

    private Long timestamp;

    public FraudRecord() {
    }

    public FraudRecord(
            String transactionId,
            String userId,
            Double amount,
            String city,
            Integer age,
            String status,
            Long timestamp
    ) {

        this.transactionId = transactionId;
        this.userId = userId;
        this.amount = amount;
        this.city = city;
        this.age = age;
        this.status = status;
        this.timestamp = timestamp;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}