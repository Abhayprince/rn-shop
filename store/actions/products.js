import Product from "../../models/product";
import * as api from "../../services/api-service";

export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const deleteUserProduct = (productId) => {
  return (dispatch, getState) => {
    const { auth } = getState(); // Gives complete Redux State Snapshot (Thanks to ReduxThunk)

    api
      .deleteProduct(`products/${productId}.json?auth=${auth.token}`)
      .then(() => {
        dispatch({
          type: DELETE_USER_PRODUCT,
          productId,
        });
      });
  };
};
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { auth } = getState(); // Gives complete Redux State Snapshot (Thanks to ReduxThunk)
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
          description: '',
          ownerId: ''
        }, 
        id1: {title: '', price: 10, imageUrl: '', description: '',ownerId: ''} 
      } */
      const loadedProducts = [];
      for (const key in products) {
        if (products.hasOwnProperty(key)) {
          const { title, price, imageUrl, description, ownerId } = products[
            key
          ];
          loadedProducts.push(
            new Product(key, ownerId, title, imageUrl, description, price)
          );
        }
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((p) => p.ownerId === auth.userId),
      });
    } catch (error) {
      // Send to analytics
      throw error; // to be catched in caller component
    }
  };
};
export const addProduct = (title, price, imageUrl, description) => {
  return async (dispatch, getState) => {
    console.log("getState", getState());
    // We can do our async tasks here (Thanks to ReduxThunk)
    const { auth } = getState(); // Gives complete Redux State Snapshot (Thanks to ReduxThunk)
    console.log("auth", auth);
    const { token, userId } = auth;
    console.log("token, userId", token, userId);
    try {
      const response = await api.post(`products.json?auth=${token}`, {
        title,
        price,
        imageUrl,
        description,
        ownerId: userId,
      });
      if (!response.ok) {
        throw new Error("An error has occurred");
      }
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
        ownerId: userId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};
export const updateProduct = (productId, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    try {
      const response = await api.patch(
        `products/${productId}.json?auth=${token}`,
        {
          title,
          imageUrl,
          description,
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        productId,
        title,
        imageUrl,
        description,
        ownerId: auth.userId,
      });
    } catch (error) {
      throw error;
    }
  };
};
