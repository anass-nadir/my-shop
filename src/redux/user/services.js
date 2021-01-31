import axios from '../../utils/axios';
export const registerService = (request) => {
  return axios
    .post(`/auth/register`, request.payload)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};

export const loginService = (request) => {
  return axios
    .post(`/auth/login`, request.payload)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};
export const getProfileService = () => {
  return axios.get('/users/get-profile')
  .then(({data}) => {
    return data
  })
  .catch(({ response }) => {
    return response.data;
  });
}
export const requestLogoutService = () => {
  return axios.get('/auth/logout')
  .then(({data}) => {
    return data
  })
  .catch(({ response }) => {
    return response.data;
  });
}