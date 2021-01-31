import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProfile } from './redux/user/actions';

import './App.css';

import Header from './components/header/header';
import Spinner from './components/spinner/spinner';
import SecureRoute from './components/secureRoute/secureRoute';

const HomePage = lazy(() => import('./pages/index'));
const ShopPage = lazy(() => import('./pages/shop/shop'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/signInAndSignUp/signInAndSignUp')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'));

const App = ({ isAuthenticated, currentUser, getUser }) => {
  useEffect(() => {
    if (isAuthenticated && !currentUser) getUser();
  }, [isAuthenticated, currentUser, getUser]);

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
            isAuthenticated={isAuthenticated}
          />
          <Route
            path='/signin'
            component={() =>
              isAuthenticated ? <Redirect to='/' /> : <SignInAndSignUpPage />
            }
          />
        </Suspense>
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    currentUser: user.currentUser,
    isAuthenticated: user.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getProfile())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
