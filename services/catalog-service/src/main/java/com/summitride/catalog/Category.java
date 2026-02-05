package com.summitride.catalog;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String slug;
  private String description;

  protected Category() {
  }

  public Category(String name, String slug, String description) {
    this.name = name;
    this.slug = slug;
    this.description = description;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getSlug() {
    return slug;
  }

  public String getDescription() {
    return description;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setSlug(String slug) {
    this.slug = slug;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
