import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import './App.css';
import ActiveSession from './ActiveSession';
import HomePage from './pages/index';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/signInAndSignUp/signInAndSignUp';
import Header from './components/header/header';
const App = props => {
  return (
    <div>
      <BrowserRouter>
        <Header session={props.session} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route
            path='/signin'
            component={() =>
              props.session && props.session.loggedUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage refetch={props.refetch} />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default ActiveSession(App);
