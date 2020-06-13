import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header';
import Spinner from './components/spinner/spinner';
import { checkUserToken } from './redux/user/actions';
import { selectCurrentUser } from './redux/user/selectors';
const HomePage = lazy(() => import('./pages/index'));
const ShopPage = lazy(() => import('./pages/shop/shop'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/signInAndSignUp/signInAndSignUp')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'));
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const App = ({ checkToken, currentUser }) => {
  let authToken = useQuery().get('auth-token');
  useEffect(() => {
    authToken && localStorage.setItem('token', authToken);
    checkToken();
  }, [checkToken, authToken]);
  return (
    <div>
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />
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
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = (dispatch) => ({
  checkToken: () => dispatch(checkUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
