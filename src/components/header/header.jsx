import React from 'react';
import { Link } from 'react-router-dom';


import './header.scss';

const Header = () => (
  <div className='header'>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/signin'>
        LOGIN/REGISTER
      </Link>
    </div>
  </div>
);

export default Header;