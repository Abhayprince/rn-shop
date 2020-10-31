import Order from "../../models/order";
import * as api from "../../services/api-service";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const { auth } = getState(); // Gives complete Redux State Snapshot (Thanks to ReduxThunk)
    try {
      const response = await api.get(`orders/${auth.userId}.json`);
      if (!response.ok) {
        throw new Error("An error has occurred");
      }
      const orders = await response.json();

      const loadedOrders = [];
      for (const key in orders) {
        if (orders.hasOwnProperty(key)) {
          const { items, totalAmount, date } = orders[key];
          loadedOrders.push(new Order(key, items, totalAmount, new Date(date)));
        }
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      // Send to analytics
      throw error; // to be catched in caller component
    }
  };
};

export const addOrder = (items, totalAmount) => {
  return async (dispatch, getState) => {
    // We can do our async tasks here (Thanks to ReduxThunk)
    const { auth } = getState();
    const { userId, token } = auth;
    try {
      const date = new Date();

      const response = await api.post(`orders/${userId}.json?auth=${token}`, {
        items,
        totalAmount,
        date: date.toISOString(),
      });

      const responseData = await response.json(); // {"name": UniqueId}

      console.log(responseData);

      const id = responseData.name;
      dispatch({
        type: ADD_ORDER,
        orderData: { id, items, totalAmount, date },
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};
