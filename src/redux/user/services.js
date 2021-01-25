import axios from '../../utils/axios';
export const registerService = request => {
  return axios
    .post(`/users/create`, request.payload)
    .then(({ data }) => {
      if (data.data.token) localStorage.setItem('token', data.data.token);
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};

export const loginService = request => {
  return axios
    .post(`/users/login`, request.payload)
    .then(({ data }) => {
      if (data.data.token) localStorage.setItem('token', data.data.token);
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};
export const checkUserTokenService = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return axios
      .get(`/users/check-token`, { params: { token: token } })
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        localStorage.removeItem('token');
        return response.data;
      });
  }
  return 'no token';
};
