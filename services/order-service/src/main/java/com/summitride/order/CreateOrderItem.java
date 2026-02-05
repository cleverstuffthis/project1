package com.summitride.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreateOrderItem(
    @NotBlank String sku,
    @NotBlank String name,
    @Min(1) int quantity,
    @Min(0) int unitPrice
) {
}
