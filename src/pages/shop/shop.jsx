import React, { useEffect, Suspense, lazy } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/product/actions';
import Spinner from '../../components/spinner/spinner'

const CollectionsOverviewContainer = lazy(() =>
      import('../../components/collectionsOverview/collectionsOverviewContainer')
);

const CollectionPageContainer = lazy(() =>
      import('../collection/collectionContainer')
);
const Shop = ({ getProducts, match }) => {
      useEffect(() => {
            getProducts();
      }, [getProducts]);
      return (
            <div className='shop-page'>
                  <Suspense fallback={<Spinner />}>
                        <Route
                              exact
                              path={`${match.path}`}
                              component={CollectionsOverviewContainer}
                        />
                        <Route
                              path={`${match.path}/:collectionId`}
                              component={CollectionPageContainer}
                        />
                  </Suspense>
            </div>
      )
}
const mapDispatchToProps = dispatch => ({
      getProducts: () => dispatch(fetchProducts())
});
export default connect(null, mapDispatchToProps)(Shop)
