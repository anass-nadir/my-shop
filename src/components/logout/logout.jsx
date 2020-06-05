import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class LogoutButton extends Component {
  logout = async client => {
    localStorage.removeItem('token');
    await client.resetStore();
    this.props.history.push('/signin');
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <button className="option" onClick={() => this.logout(client)}>LOGOUT</button>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(LogoutButton);