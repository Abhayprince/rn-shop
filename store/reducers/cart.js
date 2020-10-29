import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_USER_PRODUCT } from "../actions/products";

const initialState = {
  items: {}, // {[productId]: {id:1, title:'',price:'',quantity:1,sum:1.0}}
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.product;
      const sameExistingProductInCart = state.items[product.id];

      let newOrUpdatedItem;
      if (sameExistingProductInCart) {
        newOrUpdatedItem = new CartItem(
          sameExistingProductInCart.quantity + 1,
          product.price,
          product.title,
          sameExistingProductInCart.sum + product.price
        );
      } else {
        newOrUpdatedItem = new CartItem(
          1,
          product.price,
          product.title,
          product.price
        );
      }
      return {
        ...state,
        items: { ...state.items, [product.id]: newOrUpdatedItem },
        totalAmount: state.totalAmount + product.price,
      };
    case REMOVE_FROM_CART:
      const cartProduct = state.items[action.productId];
      let updatedCartItems;
      if (cartProduct.quantity > 1) {
        const updatedCartItem = new CartItem(
          cartProduct.quantity - 1,
          cartProduct.price,
          cartProduct.title,
          cartProduct.sum - cartProduct.price
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - cartProduct.price,
      };
    case ADD_ORDER: // Because React dispatches actions to all the reducers
      return initialState;
    case DELETE_USER_PRODUCT:
      if (!state.items[action.productId]) return state;
      const cartItems = { ...state.items };
      const productSum = cartItems[action.productId].sum;
      delete cartItems[action.productId];
      return {
        ...state,
        items: cartItems,
        totalAmount: state.totalAmount - productSum,
      };
    default:
      return state;
  }
};
