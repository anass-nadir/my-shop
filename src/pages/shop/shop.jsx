import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchProducts } from '../../redux/product/actions';
import { selectAllProducts, selectIsProductsFetching } from '../../redux/product/selectors';
import Spinner from '../../components/spinner/spinner'
import CollectionPreview from '../../components/collectionPreview/collectionPreview';

const Shop = ({ getProducts, products, isFetching }) => {
      useEffect(() => {
            getProducts();
      }, [getProducts]);
      return (
            <div className='shop-page'>
                  {isFetching ? <Spinner/> : products.map(({ _id, ...otherCollectionProps }) => (
                        <CollectionPreview key={_id} {...otherCollectionProps} />
                  ))}
            </div>
      )
}
const mapStateToProps = createStructuredSelector({
      products: selectAllProducts,
      isFetching: selectIsProductsFetching
});
const mapDispatchToProps = dispatch => ({
      getProducts: () => dispatch(fetchProducts())
});
export default connect(mapStateToProps, mapDispatchToProps)(Shop)
