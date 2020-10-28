import { ADD_TO_CART } from "./cart";

export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (items, totalAmount) => ({
  type: ADD_ORDER,
  orderData: { items, totalAmount },
});
