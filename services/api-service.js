export const baseUrl = "https://rn-shop-63991.firebaseio.com";

export const get = (url) => fetch(`${baseUrl}/${url}`);

export const post = (url, data) => postWithFullUrl(`${baseUrl}/${url}`, data);

export const postWithFullUrl = (fullUrl, data) =>
  fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const put = (url, data) =>
  fetch(`${baseUrl}/${url}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
export const patch = (url, data) =>
  fetch(`${baseUrl}/${url}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const deleteProduct = (url) =>
  fetch(`${baseUrl}/${url}`, {
    method: "DELETE",
  });
