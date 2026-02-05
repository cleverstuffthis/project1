package com.summitride.pricing;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record PriceQuoteRequest(
    @NotEmpty List<PriceQuoteItem> items,
    boolean member,
    String promoCode
) {
}
