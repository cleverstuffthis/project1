package com.summitride.inventory;

import java.util.List;

public record OrderPlacedEvent(Long orderId, List<OrderPlacedItem> items) {
  public record OrderPlacedItem(String sku, int quantity) {
  }
}
