import { useAppSelector } from '../../redux/hooks';
import CollectionPreview from '../collectionPreview/collectionPreview';
import Spinner from '../spinner/spinner';

import './collectionsOverview.scss';

export const CollectionsOverview = () => {
  const { isFetching } = useAppSelector(({ product }) => product);
  const products = useAppSelector(
    ({ product: { inventory } }) => inventory
  ) as IInventory[];

  return isFetching ? (
    <Spinner />
  ) : (
    <div className='collections-overview-container'>
      {(products &&
        products.map(product => (
          <CollectionPreview key={product.category._id} {...product} />
        ))) || <h1>There&lsquo;s nothing to display for now</h1>}
    </div>
  );
};

// export default withContainer({ stateName: 'product' })(CollectionsOverview);
export default CollectionsOverview;
