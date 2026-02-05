package com.summitride.inventory;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessagingConfig {
  @Bean
  public Queue orderPlacedQueue() {
    return new Queue("orders.placed", true);
  }
}
