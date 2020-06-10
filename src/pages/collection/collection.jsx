import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collectionItem/collectionItem';

import { selectCollection } from '../../redux/product/selectors';

import "./collection.scss"

export const CollectionPage = ({ collection }) => {
  const { title, products } = collection;
  return (
    <div className="collection-page-container">
      <h2 className="collection-title">{title}</h2>
      <div className="collection-items-container">
        {products?products.map(item => (
          <CollectionItem key={item._id} item={item} />
        )): 'No Product Found'}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
