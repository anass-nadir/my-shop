import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../redux/product/actions';

import Directory from '../../components/directory/directory';

import './index.scss';

const Index = ({ fetchCategories }) => {
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className='homepage'>
      <Directory />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories())
});

export default connect(null, mapDispatchToProps)(Index);
