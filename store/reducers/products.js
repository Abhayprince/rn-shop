import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_USER_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((p) => p.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter((p) => p.ownerId === "u1"),
      };
    case ADD_PRODUCT:
      const newProduct = new Product(
        action.id,
        "u1",
        action.title,
        action.imageUrl,
        action.description,
        action.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: [...state.userProducts, newProduct],
      };
    case UPDATE_PRODUCT:
      const { productId, title, imageUrl, description } = action;
      const pIndex = state.userProducts.findIndex((p) => p.id === productId);
      if (pIndex > -1) {
        const updatedProduct = new Product(
          productId,
          state.userProducts[pIndex].ownerId,
          title,
          imageUrl,
          description,
          state.userProducts[pIndex].price
        );
        const userProducts = [...state.userProducts];
        userProducts[pIndex] = updatedProduct;
        return {
          ...state,
          userProducts: userProducts,
          availableProducts: userProducts.filter((p) => p.ownerId === "u1"),
        };
      }
      return state;
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
