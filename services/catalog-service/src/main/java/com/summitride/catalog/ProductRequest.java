package com.summitride.catalog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductRequest(
    @NotBlank String sku,
    @NotBlank String name,
    @NotBlank String category,
    @NotBlank String tier,
    @NotNull Integer price,
    @NotBlank String imageUrl,
    @NotBlank String summary,
    boolean ebike,
    boolean featured
) {
}
