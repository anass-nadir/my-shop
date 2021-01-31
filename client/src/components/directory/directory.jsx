import React from 'react';
import { compose } from 'redux';

import { connect } from 'react-redux';
import MenuItem from '../menuItem/menuItem';
import withContainer from '../../hoc/withContainer';

import './directory.scss';

const Directory = ({ categories }) => {
  return (
    (categories.length && (
      <div className='directory-menu'>
        {categories.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    )) || <h1> There's nothing to display for now </h1>
  );
};
const mapStateToProps = ({ product }) => {
  return {
    categories: product.categories
  };
};

export default compose(
  withContainer({ stateName: 'product' }),
  connect(mapStateToProps)
)(Directory);
