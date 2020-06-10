import React from 'react';

import Spinner from '../spinner/spinner';

const WithSpinner = WrappedComponent => ({ isFetching, ...otherProps }) => {
  return isFetching ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
