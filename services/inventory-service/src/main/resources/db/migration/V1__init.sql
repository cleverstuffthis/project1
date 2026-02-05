CREATE TABLE inventory_item (
  id SERIAL PRIMARY KEY,
  sku TEXT NOT NULL UNIQUE,
  quantity INTEGER NOT NULL,
  status TEXT NOT NULL
);

INSERT INTO inventory_item (sku, quantity, status) VALUES
  ('END-X1', 12, 'in_stock'),
  ('END-X1E', 8, 'in_stock'),
  ('DH-R1', 5, 'low_stock'),
  ('TRL-T1', 14, 'in_stock'),
  ('XC-V1', 9, 'in_stock'),
  ('SE-S1', 4, 'low_stock'),
  ('CMP-WHEEL-01', 22, 'in_stock'),
  ('GEAR-HELM-01', 18, 'in_stock');
