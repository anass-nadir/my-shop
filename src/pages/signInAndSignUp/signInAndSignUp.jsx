import React from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import SignIn from '../../components/signIn/signIn.jsx';

import './signInAndSignUp.scss';

const loginUser = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;
const SignInAndSignUp = ({ history, refetch }) => (
  <Mutation mutation={loginUser}>
    {(login, { loading, error }) => (
      <div className='sign-in-and-sign-up'>
        <SignIn history={history} refetch={refetch} login={login} />
        {loading &&
          <div>trying to login…</div>
        }
        {error &&
          <div>{error.message}</div>
        }
      </div>
    )}
  </Mutation>
);

export default withRouter(SignInAndSignUp);