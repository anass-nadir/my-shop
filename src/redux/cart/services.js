import axios from '../utils/axios';
export const getCartItemsService = () => {
  return axios
    .get(`/cart`, { privateRoute: true })
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};

export const pushCartService = items => {
  return axios
    .put(`/cart/refresh`, { privateRoute: true }, { items: items })
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};
