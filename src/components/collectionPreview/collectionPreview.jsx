import React from 'react';

import CollectionItem from '../collectionItem/collectionItem';

import './collectionPreview.scss';

const CollectionPreview = ({ title, products }) => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {products
        .filter((item, idx) => idx < 4)
        .map(product => (
          <CollectionItem key={product._id} item={product} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;