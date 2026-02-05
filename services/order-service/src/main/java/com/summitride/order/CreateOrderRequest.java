package com.summitride.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record CreateOrderRequest(
    @NotBlank String userId,
    @NotEmpty List<CreateOrderItem> items
) {
}
