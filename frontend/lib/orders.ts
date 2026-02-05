export type Order = {
  id: string;
  username: string;
  total: number;
  createdAt: string;
  items: Array<{ sku: string; name: string; quantity: number; price: number }>;
};

const ORDERS_KEY = "summit-ride-orders";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") {
    return [];
  }
  const stored = window.localStorage.getItem(ORDERS_KEY);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored) as Order[];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  if (typeof window === "undefined") {
    return;
  }
  const orders = loadOrders();
  orders.unshift(order);
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrdersForUser(username: string) {
  return loadOrders().filter((order) => order.username === username);
}
