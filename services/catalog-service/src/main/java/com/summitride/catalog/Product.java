package com.summitride.catalog;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String sku;
  private String name;
  private String category;
  private String tier;
  private Integer price;
  private String imageUrl;
  private String summary;
  private boolean ebike;
  private boolean featured;

  protected Product() {
  }

  public Product(
      String sku,
      String name,
      String category,
      String tier,
      Integer price,
      String imageUrl,
      String summary,
      boolean ebike,
      boolean featured
  ) {
    this.sku = sku;
    this.name = name;
    this.category = category;
    this.tier = tier;
    this.price = price;
    this.imageUrl = imageUrl;
    this.summary = summary;
    this.ebike = ebike;
    this.featured = featured;
  }

  public Long getId() {
    return id;
  }

  public String getSku() {
    return sku;
  }

  public void setSku(String sku) {
    this.sku = sku;
  }

  public String getName() {
    return name;
  }

  public String getCategory() {
    return category;
  }

  public String getTier() {
    return tier;
  }

  public Integer getPrice() {
    return price;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public String getSummary() {
    return summary;
  }

  public boolean isEbike() {
    return ebike;
  }

  public boolean isFeatured() {
    return featured;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public void setTier(String tier) {
    this.tier = tier;
  }

  public void setPrice(Integer price) {
    this.price = price;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public void setEbike(boolean ebike) {
    this.ebike = ebike;
  }

  public void setFeatured(boolean featured) {
    this.featured = featured;
  }
}
