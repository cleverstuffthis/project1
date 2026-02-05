package com.summitride.pricing;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Promotion {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String category;
  private int percentOff;
  private boolean memberOnly;
  private Integer minCartValue;
  private LocalDate startsOn;
  private LocalDate endsOn;

  protected Promotion() {
  }

  public Promotion(
      String name,
      String category,
      int percentOff,
      boolean memberOnly,
      Integer minCartValue,
      LocalDate startsOn,
      LocalDate endsOn
  ) {
    this.name = name;
    this.category = category;
    this.percentOff = percentOff;
    this.memberOnly = memberOnly;
    this.minCartValue = minCartValue;
    this.startsOn = startsOn;
    this.endsOn = endsOn;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getCategory() {
    return category;
  }

  public int getPercentOff() {
    return percentOff;
  }

  public boolean isMemberOnly() {
    return memberOnly;
  }

  public Integer getMinCartValue() {
    return minCartValue;
  }

  public LocalDate getStartsOn() {
    return startsOn;
  }

  public LocalDate getEndsOn() {
    return endsOn;
  }
}
