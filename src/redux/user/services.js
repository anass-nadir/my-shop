import axios from 'axios';
export const registerService = request => {
  const CREATE_ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/users/create`;

  return axios
    .post(CREATE_ENDPOINT, JSON.stringify(request.payload), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      if (data.data.token) localStorage.setItem('token', data.data.token);
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};

export const loginService = request => {
  const LOGIN_ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/users/login`;
  return axios
    .post(LOGIN_ENDPOINT, JSON.stringify(request.payload), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      if (data.data.token) localStorage.setItem('token', data.data.token);
      return data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};
export const checkUserTokenService = async () => {
  const token = await localStorage.getItem('token');
  if (token) {
    const TOKEN_ENDPOINT = `${process.env.REACT_APP_SERVER_URL}/users/check-token`;
    return axios
      .get(
        TOKEN_ENDPOINT,
        { params: { token: token } },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        localStorage.removeItem('token');
        return response.data;
      });
  }
};
