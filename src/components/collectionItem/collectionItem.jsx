import React from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/actions';
import './collectionItem.scss';

const CollectionItem = ({ item, dispatch }) => {
  const { name, price, imageURL } = item;
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageURL})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <button className="custom-button inverted" onClick={() => dispatch(addItem(item))}>
        Add to cart
    </button>
    </div>
  )
};


export default connect()(CollectionItem);