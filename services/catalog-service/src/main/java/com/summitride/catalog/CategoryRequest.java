package com.summitride.catalog;

import jakarta.validation.constraints.NotBlank;

public record CategoryRequest(
    @NotBlank String name,
    @NotBlank String slug,
    @NotBlank String description
) {
}
