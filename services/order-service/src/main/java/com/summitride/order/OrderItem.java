package com.summitride.order;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String sku;
  private String name;
  private int quantity;
  private int unitPrice;

  @ManyToOne
  @JoinColumn(name = "order_id")
  private CustomerOrder order;

  protected OrderItem() {
  }

  public OrderItem(String sku, String name, int quantity, int unitPrice) {
    this.sku = sku;
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  public void setOrder(CustomerOrder order) {
    this.order = order;
  }

  public Long getId() {
    return id;
  }

  public String getSku() {
    return sku;
  }

  public String getName() {
    return name;
  }

  public int getQuantity() {
    return quantity;
  }

  public int getUnitPrice() {
    return unitPrice;
  }
}
