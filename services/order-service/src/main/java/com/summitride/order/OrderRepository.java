package com.summitride.order;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {
  List<CustomerOrder> findByUserId(String userId);
}
