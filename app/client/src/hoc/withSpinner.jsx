import Spinner from '../components/spinner/spinner';

const withSpinner = WrappedComponent => ({ isFetching, ...otherProps }) => {
  return isFetching ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default withSpinner;
