import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collectionPreview/collectionPreview';

import { selectAllProducts } from '../../redux/product/selectors';
import './collectionsOverview.scss'

export const CollectionsOverview = ({ products }) => (
  <div className="collections-overview-container">
    {products.map(product => (
      <CollectionPreview key={product._id} {...product} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  products: selectAllProducts
});

export default connect(mapStateToProps)(CollectionsOverview);
