import React from 'react';
import { Link } from 'react-router-dom';

import LogoutButton from '../logout/logout';
import CartIcon from '../cartIcon/cartIcon';
import CartDropdown from '../cartDropdown/cartDropdown';

import './header.scss';
import { useAppSelector } from '../../redux/hooks';

interface ILinksProps {
  hidden: boolean;
  currentUser?: IUser | null;
}
const LinksNoAuth = ({ hidden }: ILinksProps) => (
  <div className='options'>
    <Link className='option' to='/'>
      INDEX
    </Link>
    <Link className='option' to='/shop'>
      SHOP
    </Link>
    <CartIcon />
    {hidden ? null : <CartDropdown />}
    <Link className='option' to='/signin'>
      LOGIN/REGISTER
    </Link>
  </div>
);

const LinksWithAuth = ({ currentUser, hidden }: ILinksProps) => (
  <div className='options'>
    welcome {currentUser?.name}
    <Link className='option' to='/'>
      INDEX
    </Link>
    <Link className='option' to='/shop'>
      SHOP
    </Link>
    <CartIcon />
    {hidden ? null : <CartDropdown />}
    <LogoutButton />
  </div>
);

const Header = () => {
  const { currentUser, hidden }: ILinksProps = useAppSelector(
    ({ user, cart }) => {
      return { currentUser: user.currentUser, hidden: cart.hidden };
    }
  );
  return (
    <div className='header'>
      {currentUser ? (
        <LinksWithAuth hidden={hidden} currentUser={currentUser} />
      ) : (
        <LinksNoAuth hidden={hidden} />
      )}
    </div>
  );
};

export default Header;
