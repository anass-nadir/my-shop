import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import HomePage from './pages/index';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/signInAndSignUp/signInAndSignUp';
import Header from './components/header/header';

const App = props => {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
