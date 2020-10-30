import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const { id, items, totalAmount, date } = action.orderData;
      const orderItem = new Order(id, items, totalAmount, date);
      return { ...state, orders: state.orders.concat(orderItem) };
    default:
      return state;
  }
};
