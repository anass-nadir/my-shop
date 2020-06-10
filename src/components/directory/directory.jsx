import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import MenuItem from '../menuItem/menuItem';
import { fetchCategories } from '../../redux/product/actions'
import { selectAllCategories, selectIsFetching } from '../../redux/product/selectors'

import './directory.scss';

const Directory = ({ getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <div className='directory-menu'>
      {categories.map(item => (
        <MenuItem key={item._id} item={item} />
      ))}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  categories: selectAllCategories,
  isFetching: selectIsFetching
});
const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Directory)
