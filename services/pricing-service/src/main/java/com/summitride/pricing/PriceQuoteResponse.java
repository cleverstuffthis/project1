package com.summitride.pricing;

import java.util.List;

public record PriceQuoteResponse(
    int subtotal,
    int discountTotal,
    int total,
    List<AppliedPromotion> appliedPromotions
) {
  public record AppliedPromotion(String name, int amount) {
  }
}
