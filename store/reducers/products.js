import PRODUCTS from "../../data/dummy-data";
import { DELETE_USER_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((p) => p.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (p) => p.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (p) => p.id !== action.productId
        ),
      };
      break;
    default:
      return state;
  }
};
