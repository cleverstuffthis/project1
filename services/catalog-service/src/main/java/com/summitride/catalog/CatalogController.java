package com.summitride.catalog;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
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

  @PostMapping("/api/categories")
  public Category createCategory(@Valid @RequestBody CategoryRequest request) {
    Category category = new Category(request.name(), request.slug(), request.description());
    return categoryRepository.save(category);
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

  @PostMapping("/api/products")
  public Product createProduct(@Valid @RequestBody ProductRequest request) {
    Product product = new Product(
        request.sku(),
        request.name(),
        request.category(),
        request.tier(),
        request.price(),
        request.imageUrl(),
        request.summary(),
        request.ebike(),
        request.featured()
    );
    return productRepository.save(product);
  }

  @PutMapping("/api/products/{id}")
  public Product updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
    Product product = productRepository.findById(id).orElseThrow();
    product.setSku(request.sku());
    product.setName(request.name());
    product.setCategory(request.category());
    product.setTier(request.tier());
    product.setPrice(request.price());
    product.setImageUrl(request.imageUrl());
    product.setSummary(request.summary());
    product.setEbike(request.ebike());
    product.setFeatured(request.featured());
    return productRepository.save(product);
  }
}
