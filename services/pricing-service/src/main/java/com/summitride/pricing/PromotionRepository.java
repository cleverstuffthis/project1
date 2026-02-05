package com.summitride.pricing;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
  List<Promotion> findByStartsOnLessThanEqualAndEndsOnGreaterThanEqual(LocalDate start, LocalDate end);
}
