import axios from 'axios';
export const getProductsService = () => {
  const FETCH_PRODUCTS_ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/products`;

  return axios
    .get(FETCH_PRODUCTS_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};

export const getCategoriesService = () => {
  const FETCH_CATEGORIES_ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/products/categories`;

  return axios
    .get(FETCH_CATEGORIES_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};