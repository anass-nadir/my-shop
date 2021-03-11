import axios from '../../utils/axios';
export const getProductsService = () => {
  return axios
    .get(`/products`)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};

export const getCategoriesService = () => {
  return axios
    .get(`/products/categories`)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};
