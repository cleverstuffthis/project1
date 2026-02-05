package com.summitride.inventory;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InventoryItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String sku;
  private int quantity;
  private String status;

  protected InventoryItem() {
  }

  public InventoryItem(String sku, int quantity, String status) {
    this.sku = sku;
    this.quantity = quantity;
    this.status = status;
  }

  public Long getId() {
    return id;
  }

  public String getSku() {
    return sku;
  }

  public int getQuantity() {
    return quantity;
  }

  public String getStatus() {
    return status;
  }

  public void decrement(int amount) {
    this.quantity = Math.max(0, this.quantity - amount);
    this.status = this.quantity == 0 ? "out_of_stock" : this.status;
  }
}
