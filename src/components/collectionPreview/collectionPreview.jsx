import React from 'react';
import { withRouter } from 'react-router-dom';
import CollectionItem from '../collectionItem/collectionItem';

import './collectionPreview.scss';

const CollectionPreview = ({ title, products, _id, history, match }) => (
  <div className='collection-preview'>
    <h1 className='title' onClick={() => history.push(`${match.url}/${_id}`)}>{title.toUpperCase()}</h1>
    <div className='preview'>
      {products
        .filter((item, idx) => idx < 4)
        .map(product => (
          <CollectionItem key={product._id} item={product} />
        ))}
    </div>
  </div>
);
export default withRouter(CollectionPreview);