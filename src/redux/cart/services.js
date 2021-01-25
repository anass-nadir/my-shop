import axios from '../../utils/axios';
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
    .put(`/cart/refresh`,{ items: JSON.stringify(items) }, { privateRoute: true })
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};
