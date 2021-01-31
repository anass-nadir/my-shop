import { connect } from 'react-redux';
import { compose } from 'redux';

import withSpinner from './withSpinner';

const withContainer = ({ stateName }) => (WrappedComponent) => {
  const mapStateToProps = (state) => {
    return {
      isFetching: state[stateName].isFetching
    };
  };
  const Container = (props) => <WrappedComponent {...props} />;

  return compose(connect(mapStateToProps), withSpinner)(Container);
};

export default withContainer;
