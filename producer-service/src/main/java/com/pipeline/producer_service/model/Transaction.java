package com.pipeline.producer_service.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Transaction {

    private String transactionId;

    private String userId;

    private Double amount;

    private String location;

    private Long timestamp;
}