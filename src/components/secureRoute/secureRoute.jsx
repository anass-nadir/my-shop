import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ Component, isAuthenticated, path }) => {
      return (
            <Route
            path={path}
            component={() =>
              isAuthenticated ? <Component />  : <Redirect to='/signin' />
            }
          />
      )
}
export default SecureRoute