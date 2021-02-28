import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ Component, currentUser, path }) => {
      return (
            <Route
            path={path}
            component={() =>
              currentUser ? <Component />  : <Redirect to='/signin' />
            }
          />
      )
}
export default SecureRoute