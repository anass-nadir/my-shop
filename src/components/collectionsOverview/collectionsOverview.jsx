import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CollectionPreview from '../collectionPreview/collectionPreview';
import withContainer from '../../hoc/withContainer';

import './collectionsOverview.scss';

export const CollectionsOverview = ({ products }) => (
  <div className='collections-overview-container'>
    {products.map((product) => (
      <CollectionPreview key={product._id} {...product} />
    ))}
  </div>
);

const mapStateToProps = ({ product }) => {
  return {
    products: product.products
  };
};

export default compose(
  withContainer({ stateName: 'product' }),
  connect(mapStateToProps)
)(CollectionsOverview);
