import React, { useEffect, Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/product/actions';
import Spinner from '../../components/spinner/spinner';

const CollectionsOverview = lazy(() =>
  import('../../components/collectionsOverview/collectionsOverview')
);

const CollectionPage = lazy(() =>
  import('../../components/collection/collection')
);
const Shop = ({ getProducts, match }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <div className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </Suspense>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
});
export default connect(null, mapDispatchToProps)(Shop);
