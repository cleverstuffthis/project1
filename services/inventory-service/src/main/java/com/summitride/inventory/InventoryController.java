package com.summitride.inventory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InventoryController {
  private final InventoryRepository inventoryRepository;

  public InventoryController(InventoryRepository inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  @GetMapping("/api/inventory/{sku}")
  public InventoryItem inventory(@PathVariable String sku) {
    return inventoryRepository.findBySku(sku).orElseThrow();
  }
}
