CREATE TABLE customer_order (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE order_item (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES customer_order(id),
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL
);
