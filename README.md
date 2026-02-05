# Summit Ride Supply — Enduro Retail Reference Architecture (2026)

Summit Ride Supply is a hyper-modern, enduro-focused retail storefront built as a reference architecture for a 2026-era bike retailer. It includes a polished web storefront, OAuth-ready identity, and a microservice backend with transactional integration via RabbitMQ.

## What’s included

### Frontend (Next.js + Tailwind)
- Enduro-centric storefront with category browsing, product detail, cart, checkout, account, and admin console experiences.
- API-driven catalog rendering from the Catalog Service.
- Modular layout and design system primitives for fast iteration.

### Backend microservices (Java/Spring Boot)
- **Catalog Service**: Product and category management (Postgres + Flyway).
- **Pricing Service**: Promotion engine for category-wide discounts and member offers.
- **Inventory Service**: Inventory levels and automatic stock adjustments based on events.
- **Order Service**: Order intake with event publishing to RabbitMQ.

### Integrations & infrastructure
- **RabbitMQ**: Transactional messaging between order and inventory services.
- **Postgres**: Isolated databases per service to enforce data ownership.
- **Redis**: Future-ready caching layer.
- **OpenSearch**: Search engine for product discovery.
- **Keycloak**: OAuth provider for admin and customer identity flows.

## Running locally (Docker)

```bash
docker compose -f infra/docker-compose.yml up --build
```

Then visit:
- Storefront: `http://localhost:3000`
- Catalog API: `http://localhost:8080/api/products`
- Pricing API: `http://localhost:8081/api/pricing/quote`
- Inventory API: `http://localhost:8082/api/inventory/END-X1`
- Orders API: `http://localhost:8083/api/orders`
- Keycloak Admin: `http://localhost:8088` (admin/admin)
- RabbitMQ: `http://localhost:15672` (guest/guest)
- OpenSearch: `http://localhost:9200`

## Suggested data flows

1. **Browse**: Frontend calls Catalog Service for categories + products.
2. **Quote**: Cart service (future) calls Pricing Service for dynamic promos.
3. **Checkout**: Order Service records order + publishes `orders.placed` event.
4. **Fulfillment**: Inventory Service consumes `orders.placed` and decrements stock.

## Next steps
- Add API gateway + BFF layer for authenticated user sessions.
- Wire Keycloak into the Next.js app (OAuth + JWT).
- Add service mesh (e.g., Istio/Linkerd) for telemetry and policy.
- Extend pricing rules to support stacked promotions and campaign scheduling.
