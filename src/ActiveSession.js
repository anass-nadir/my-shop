import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  {
    loggedUser {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

const activeSession = (Component) => (props) => (
  <Query query={query}>
    {({ data, refetch }) => (
      <Component {...props} session={data} refetch={refetch} />
    )}
  </Query>
);

export default activeSession;
