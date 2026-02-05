package com.summitride.catalog;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findByCategoryIgnoreCase(String category);

  List<Product> findByFeaturedTrue();
}
