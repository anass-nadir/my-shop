import React from 'react';
import { withRouter } from 'react-router-dom';
import FormInput from '../formInput/formInput';

import './signIn.scss';


class SignIn extends React.Component {
      constructor(props) {
            super(props);

            this.state = {
                  email: '',
                  password: ''
            };
      }

      handleSubmit = event => {
            event.preventDefault();
            this.props.login({
              variables: {
                email: this.state.email,
                password: this.state.password
              }
            }).then(async ({ data }) => {
              localStorage.setItem('token', data.login.token);
              await this.props.refetch();
              this.props.history.push('/shop');
            }).catch(error => console.error(error));
          };

      handleChange = event => {
            const { value, name } = event.target;

            this.setState({ [name]: value });
      };

      render() {
            return (
                  <div className='sign-in'>
                        <h2>I already have an account</h2>
                        <span>Sign in with your email and password</span>

                        <form onSubmit={this.handleSubmit}>
                              <FormInput
                                    name='email'
                                    type='email'
                                    handleChange={this.handleChange}
                                    value={this.state.email}
                                    label='email'
                                    required
                              />
                              <FormInput
                                    name='password'
                                    type='password'
                                    value={this.state.password}
                                    handleChange={this.handleChange}
                                    label='password'
                                    required
                              />
                              <button type='submit' className='custom-button'> Sign in </button>
                        </form>
                  </div>
            );
      }
}

export default withRouter(SignIn);