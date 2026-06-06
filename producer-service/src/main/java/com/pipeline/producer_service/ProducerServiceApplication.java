package com.pipeline.producer_service;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.TimeZone;

@SpringBootApplication
@EnableScheduling

public class ProducerServiceApplication {

   static {
      TimeZone.setDefault(TimeZone.getTimeZone("Asia/Kolkata"));
   }

   public static void main(String[] args){

	System.out.println("APP STARTING");

      SpringApplication.run(
         ProducerServiceApplication.class,
         args
      );
   }
}
