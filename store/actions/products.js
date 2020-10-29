export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteUserProduct = (productId) => ({
  type: DELETE_USER_PRODUCT,
  productId,
});
export const addProduct = (title, price, imageUrl, description) => ({
  type: ADD_PRODUCT,
  title,
  price,
  imageUrl,
  description,
});
export const updateProduct = (productId, title, imageUrl, description) => ({
  type: UPDATE_PRODUCT,
  productId,
  title,
  imageUrl,
  description,
});
