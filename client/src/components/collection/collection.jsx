import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../collectionItem/collectionItem';


import './collection.scss';

export const CollectionPage = ({ collection }) => {
  const { title, products } = collection;
  return (
    <div className='collection-page-container'>
      <h2 className='collection-title'>{title}</h2>
      <div className='collection-items-container'>
        {products
          ? products.map((item) => (
              <CollectionItem key={item._id} item={item} />
            ))
          : 'No Product Found'}
      </div>
    </div>
  );
};

const mapStateToProps = ({ product }, ownProps) => ({
  collection:
    product.products.filter(
      (pr) => pr._id === ownProps.match.params.collectionId
    )[0] || []
});

export default connect(mapStateToProps)(CollectionPage);
