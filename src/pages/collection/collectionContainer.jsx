import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsFetching } from '../../redux/product/selectors';
import WithSpinner from '../../components/withSpinner/withSpinner';
import CollectionPage from './collection';

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
