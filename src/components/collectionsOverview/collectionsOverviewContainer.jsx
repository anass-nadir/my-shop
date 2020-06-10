import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsFetching } from '../../redux/product/selectors';
import WithSpinner from '../withSpinner/withSpinner';
import CollectionsOverview from './collectionsOverview';

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
