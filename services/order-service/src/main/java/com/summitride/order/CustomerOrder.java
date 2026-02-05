package com.summitride.order;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CustomerOrder {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String userId;
  private int total;
  private String status;
  private OffsetDateTime createdAt;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OrderItem> items = new ArrayList<>();

  protected CustomerOrder() {
  }

  public CustomerOrder(String userId, int total, String status, OffsetDateTime createdAt) {
    this.userId = userId;
    this.total = total;
    this.status = status;
    this.createdAt = createdAt;
  }

  public void addItem(OrderItem item) {
    items.add(item);
    item.setOrder(this);
  }

  public Long getId() {
    return id;
  }

  public String getUserId() {
    return userId;
  }

  public int getTotal() {
    return total;
  }

  public String getStatus() {
    return status;
  }

  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public List<OrderItem> getItems() {
    return items;
  }
}
