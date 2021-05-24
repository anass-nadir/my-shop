import { ChangeEvent, FormEvent, useState } from 'react';
import { fetchCart } from '../../redux/cart/thunks';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginUser } from '../../redux/user/thunks';
import FormInput from '../formInput/formInput';

import './signIn.scss';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector(({ user }) => user);

  const [form, setForm] = useState<IUser>({
    email: '',
    password: ''
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      loginUser({
        email: form.email,
        password: form.password
      })
    ).then(({ type }) => {
      type.indexOf('fulfilled') !== -1 && dispatch(fetchCart());
    });
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={form.email}
          label='email'
          autoComplete='true'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={form.password}
          handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          label='password'
          autoComplete='new-password'
          required
        />
        <button type='submit' className='custom-button'>
          {' '}
          Sign in{' '}
        </button>
        <a href='api/auth/google' className='custom-button google'>
          {' '}
          Sign in with google{' '}
        </a>
      </form>
      {(errors.length && (
        <div className='alert alert-danger'>
          <h4>Ooops....</h4>
          {errors.map((err: IValidationError, index: number) => {
            return (
              <ul className='my-0' key={index}>
                {err.name && <li>{err.name}</li>}
                {err.message && <li>{err.message}</li>}
                {err.stack && <li>{err.stack}</li>}
                {err.field && <li>{err.field}</li>}
              </ul>
            );
          })}
        </div>
      )) ||
        null}
    </div>
  );
};
export default SignIn;
