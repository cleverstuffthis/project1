package com.summitride.inventory;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class InventoryEventListener {
  private final InventoryRepository inventoryRepository;

  public InventoryEventListener(InventoryRepository inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  @Transactional
  @RabbitListener(queues = "orders.placed")
  public void handleOrderPlaced(OrderPlacedEvent event) {
    for (OrderPlacedEvent.OrderPlacedItem item : event.items()) {
      inventoryRepository.findBySku(item.sku())
          .ifPresent(inventoryItem -> inventoryItem.decrement(item.quantity()));
    }
  }
}
