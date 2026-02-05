package com.summitride.pricing;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record PriceQuoteItem(
    @NotBlank String sku,
    @NotBlank String category,
    @Min(1) int quantity,
    @Min(0) int unitPrice
) {
}
