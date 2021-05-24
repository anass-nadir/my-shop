import React, { useEffect, Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import { getInventory } from '../../redux/product/thunks';
import Spinner from '../../components/spinner/spinner';
import { useAppDispatch } from '../../redux/hooks';

const CollectionsOverview = lazy(
  () => import('../../components/collectionsOverview/collectionsOverview')
);

const CollectionPage = lazy(
  () => import('../../components/collection/collection')
);
const Shop = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  return (
    <div className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Route exact path='/shop' component={CollectionsOverview} />
        <Route path='/shop/:collectionId' component={CollectionPage} />
      </Suspense>
    </div>
  );
};

export default Shop;
