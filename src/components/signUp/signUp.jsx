import React from 'react';
import FormInput from '../formInput/formInput';

import './signUp.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
  handleSubmit = event => {
    event.preventDefault();

  };
  handleSubmit = async event => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    this.props.register({
      variables: {
        name: name,
        email: email,
        password: password
      }
    }).then(async ({ data }) => {
      localStorage.setItem('token', data.register.token);
      await this.props.refetch();
      this.props.history.push('/shop');
    }).catch(error => console.error(error));
};

handleChange = event => {
  const { name, value } = event.target;

  this.setState({ [name]: value });
};

render() {
  const { name, email, password, confirmPassword } = this.state;
  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={this.handleSubmit}>
        <FormInput
          type='text'
          name='name'
          value={name}
          onChange={this.handleChange}
          label='Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={this.handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={this.handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={this.handleChange}
          label='Confirm Password'
          required
        />
        <button type='submit' className='custom-button'> SIGN UP </button>
      </form>
    </div>
  );
}
}

export default SignUp;
