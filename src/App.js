import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/index';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/signInAndSignUp/signInAndSignUp';
import Header from './components/header/header';
import CheckoutPage from './pages/checkout/checkout';
import { checkUserToken } from './redux/user/actions';
import { selectCurrentUser } from './redux/user/selectors';

const App = ({ checkToken, currentUser }) => {
  useEffect(() => {
    checkToken();
  }, [checkToken]);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route
            path='/signin'
            component={() =>
              currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </BrowserRouter>
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
