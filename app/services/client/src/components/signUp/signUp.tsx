import { ChangeEvent, FormEvent } from 'react';
import FormInput from '../formInput/formInput';
import { registerUser } from '../../redux/user/thunks';
import './signUp.scss';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IUser>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { password, confirmPassword } = form;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    dispatch(registerUser(form));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };
  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='name'
          value={form.name}
          handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          label='Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={form.email}
          handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          label='Email'
          required
          autoComplete='my-email'
        />
        <FormInput
          type='password'
          name='password'
          value={form.password}
          handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          label='Password'
          required
          autoComplete='new-password'
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={form.confirmPassword}
          handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          label='Confirm Password'
          required
          autoComplete='confirm-password'
        />
        <button type='submit' className='custom-button'>
          {' '}
          SIGN UP{' '}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
