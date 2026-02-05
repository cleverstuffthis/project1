package com.summitride.order;

import jakarta.validation.Valid;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
  private final OrderRepository orderRepository;
  private final RabbitTemplate rabbitTemplate;

  public OrderController(OrderRepository orderRepository, RabbitTemplate rabbitTemplate) {
    this.orderRepository = orderRepository;
    this.rabbitTemplate = rabbitTemplate;
  }

  @PostMapping("/api/orders")
  public CustomerOrder createOrder(@Valid @RequestBody CreateOrderRequest request) {
    int total = request.items().stream()
        .mapToInt(item -> item.unitPrice() * item.quantity())
        .sum();

    CustomerOrder order = new CustomerOrder(request.userId(), total, "PLACED", OffsetDateTime.now());
    for (CreateOrderItem item : request.items()) {
      order.addItem(new OrderItem(item.sku(), item.name(), item.quantity(), item.unitPrice()));
    }

    CustomerOrder saved = orderRepository.save(order);

    List<OrderPlacedEvent.OrderPlacedItem> eventItems = saved.getItems().stream()
        .map(item -> new OrderPlacedEvent.OrderPlacedItem(item.getSku(), item.getQuantity()))
        .toList();

    rabbitTemplate.convertAndSend("orders.placed", new OrderPlacedEvent(saved.getId(), eventItems));

    return saved;
  }

  @GetMapping("/api/orders/{id}")
  public CustomerOrder order(@PathVariable Long id) {
    return orderRepository.findById(id).orElseThrow();
  }

  @GetMapping("/api/orders")
  public List<CustomerOrder> orders(@RequestParam(required = false) String userId) {
    if (userId != null && !userId.isBlank()) {
      return orderRepository.findByUserId(userId);
    }
    return orderRepository.findAll();
  }
}
