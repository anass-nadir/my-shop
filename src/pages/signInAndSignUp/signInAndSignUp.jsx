import React from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import SignIn from '../../components/signIn/signIn';
import SignUp from '../../components/signUp/signUp';
import './signInAndSignUp.scss';

const loginUser = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;
const registerUser = gql`
mutation register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    token
  }
}
`;
const SignInAndSignUp = ({ history, refetch }) => (
    <div className='sign-in-and-sign-up'>
      <Mutation mutation={loginUser}>
        {(login, { loading, error }) => (
          <React.Fragment>
            <SignIn history={history} refetch={refetch} login={login} />
            {loading &&
              <div>trying to login…</div>
            }
            {error &&
              <div>{error.message}</div>
            }
          </React.Fragment>
        )}
      </Mutation>
      <Mutation mutation={registerUser}>
        {(register, { loading, error }) => (
          <React.Fragment>
            <SignUp history={history} refetch={refetch} register={register} />
            {loading &&
              <div>trying to sign you up…</div>
            }
            {error &&
              <div>{error.message}</div>
            }
          </React.Fragment>
        )}
      </Mutation>
    </div>
);

export default withRouter(SignInAndSignUp);