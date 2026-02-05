CREATE TABLE promotion (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  percent_off INTEGER NOT NULL,
  member_only BOOLEAN NOT NULL,
  min_cart_value INTEGER,
  starts_on DATE NOT NULL,
  ends_on DATE NOT NULL
);

INSERT INTO promotion (name, category, percent_off, member_only, min_cart_value, starts_on, ends_on) VALUES
  ('Enduro Launch Week', 'enduro', 10, FALSE, 5000, CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE + INTERVAL '14 day'),
  ('Member Gear Drop', 'gear', 15, TRUE, 200, CURRENT_DATE - INTERVAL '2 day', CURRENT_DATE + INTERVAL '30 day'),
  ('Suspension Service Bundle', 'service', 20, FALSE, 150, CURRENT_DATE - INTERVAL '7 day', CURRENT_DATE + INTERVAL '21 day');
