import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/user/actions';
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
            this.props.dispatch(loginUser({
                  email: this.state.email,
                  password: this.state.password
            }));
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

export default connect()(SignIn);