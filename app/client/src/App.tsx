import { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getCurrentUser } from './redux/user/thunks';

import Header from './components/header/header';
import Spinner from './components/spinner/spinner';
import SecureRoute from './components/secureRoute/secureRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchCart } from './redux/cart/thunks';

const HomePage = lazy(() => import('./pages/index/index'));
const ShopPage = lazy(() => import('./pages/shop/shop'));
const SignInAndSignUpPage = lazy(
  () => import('./pages/signInAndSignUp/signInAndSignUp')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'));

const App = () => {
  const { currentUser, cookiePresent } = useAppSelector(({ user }) => user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUser && cookiePresent)
      dispatch(getCurrentUser()).then(({ type }) => {
        type.indexOf('fulfilled') !== -1 && dispatch(fetchCart());
      });
  }, [currentUser, dispatch, cookiePresent]);

  return (
    <div>
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <SecureRoute
            Component={CheckoutPage}
            path='/checkout'
            currentUser={currentUser}
          />
          <Route
            path='/signin'
            component={() =>
              currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
            }
          />
        </Suspense>
      </Switch>
    </div>
  );
};

export default App;
