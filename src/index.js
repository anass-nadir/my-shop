import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import './index.scss';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}`,
  request: async req => {
    const token = await localStorage.getItem('token');
    if (token) {
      req.setContext({
        headers: {
          'x-auth-token': token,
        },
      });
    } else {
      req.setContext();
    }
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
