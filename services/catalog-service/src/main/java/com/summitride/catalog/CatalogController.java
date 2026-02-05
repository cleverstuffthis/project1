package com.summitride.catalog;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CatalogController {
  private final CategoryRepository categoryRepository;
  private final ProductRepository productRepository;

  public CatalogController(CategoryRepository categoryRepository, ProductRepository productRepository) {
    this.categoryRepository = categoryRepository;
    this.productRepository = productRepository;
  }

  @GetMapping("/api/categories")
  public List<Category> categories() {
    return categoryRepository.findAll();
  }

  @GetMapping("/api/products")
  public List<Product> products(
      @RequestParam(required = false) String category,
      @RequestParam(required = false, defaultValue = "false") boolean featured
  ) {
    if (featured) {
      return productRepository.findByFeaturedTrue();
    }
    if (category != null && !category.isBlank()) {
      return productRepository.findByCategoryIgnoreCase(category);
    }
    return productRepository.findAll();
  }

  @GetMapping("/api/products/{id}")
  public Product product(@PathVariable Long id) {
    return productRepository.findById(id).orElseThrow();
  }
}
