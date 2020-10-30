import Product from "../../models/product";
import * as api from "../../services/api-service";

export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const deleteUserProduct = (productId) => {
  return (dispatch) => {
    api.deleteProduct(`products/${productId}.json`).then(() => {
      dispatch({
        type: DELETE_USER_PRODUCT,
        productId,
      });
    });
  };
};
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("products.json");
      if (!response.ok) {
        throw new Error("An error has occurred");
      }
      const products = await response.json();
      /* { 
        id1: {
          title: '', 
          price: 10, 
          imageUrl: '', 
          description: ''
        }, 
        id1: {title: '', price: 10, imageUrl: '', description: ''} 
      } */
      const loadedProducts = [];
      for (const key in products) {
        if (products.hasOwnProperty(key)) {
          const { title, price, imageUrl, description } = products[key];
          loadedProducts.push(
            new Product(key, "u1", title, imageUrl, description, price)
          );
        }
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      // Send to analytics
      throw error; // to be catched in caller component
    }
  };
};
export const addProduct = (title, price, imageUrl, description) => {
  return async (dispatch) => {
    // We can do our async tasks here (Thanks to ReduxThunk)
    try {
      const response = await api.post("products.json", {
        title,
        price,
        imageUrl,
        description,
      });

      const responseData = await response.json(); // {"name": UniqueId}

      console.log(responseData);

      const id = responseData.name;
      dispatch({
        type: ADD_PRODUCT,
        id,
        title,
        price,
        imageUrl,
        description,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};
export const updateProduct = (productId, title, imageUrl, description) => {
  return async (dispatch) => {
    try {
      const response = await api.patch(`products/${productId}.json`, {
        title,
        imageUrl,
        description,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        productId,
        title,
        imageUrl,
        description,
      });
    } catch (error) {
      throw error;
    }
  };
};
