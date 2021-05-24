import React, { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface ISecureRouteProps {
  Component: ComponentType;
  currentUser: IUser | null;
  path: string;
}
const SecureRoute = ({
  Component,
  currentUser,
  path
}: ISecureRouteProps): JSX.Element => {
  return (
    <Route
      path={path}
      component={() =>
        currentUser ? <Component /> : <Redirect to='/signin' />
      }
    />
  );
};
export default SecureRoute;
