package com.summitride.pricing;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PricingController {
  private final PromotionRepository promotionRepository;

  public PricingController(PromotionRepository promotionRepository) {
    this.promotionRepository = promotionRepository;
  }

  @PostMapping("/api/pricing/quote")
  public PriceQuoteResponse quote(@Valid @RequestBody PriceQuoteRequest request) {
    int subtotal = request.items().stream()
        .mapToInt(item -> item.unitPrice() * item.quantity())
        .sum();

    List<Promotion> activePromotions = promotionRepository
        .findByStartsOnLessThanEqualAndEndsOnGreaterThanEqual(LocalDate.now(), LocalDate.now());

    List<PriceQuoteResponse.AppliedPromotion> appliedPromotions = new ArrayList<>();
    int discountTotal = 0;

    for (Promotion promotion : activePromotions) {
      if (promotion.isMemberOnly() && !request.member()) {
        continue;
      }
      if (promotion.getMinCartValue() != null && subtotal < promotion.getMinCartValue()) {
        continue;
      }
      int promoDiscount = request.items().stream()
          .filter(item -> item.category().equalsIgnoreCase(promotion.getCategory()))
          .mapToInt(item -> (item.unitPrice() * item.quantity() * promotion.getPercentOff()) / 100)
          .sum();
      if (promoDiscount > 0) {
        discountTotal += promoDiscount;
        appliedPromotions.add(new PriceQuoteResponse.AppliedPromotion(promotion.getName(), promoDiscount));
      }
    }

    int total = Math.max(subtotal - discountTotal, 0);

    return new PriceQuoteResponse(subtotal, discountTotal, total, appliedPromotions);
  }
}
