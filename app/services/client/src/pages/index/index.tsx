import React, { useEffect } from 'react';
import { getCategories } from '../../redux/product/thunks';

import Directory from '../../components/directory/directory';

import './index.scss';
import { useAppDispatch } from '../../redux/hooks';

const Index = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className='homepage'>
      <Directory />
    </div>
  );
};

export default Index;
