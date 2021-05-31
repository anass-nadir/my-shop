import React from 'react';
import { useHistory } from 'react-router-dom';
import CollectionItem from '../collectionItem/collectionItem';

import './collectionPreview.scss';

const CollectionPreview = ({
  category: { _id, title },
  products
}: IInventory) => {
  const { push } = useHistory();

  return (
    <div className='collection-preview'>
      <h1 className='title' onClick={() => push(`/shop/${_id}`)}>
        {title?.toUpperCase()}
      </h1>
      <div className='preview'>
        {products &&
          products
            .filter((item, idx): any => idx < 4)
            .map((product: IProduct) => (
              <CollectionItem key={product._id} {...product} />
            ))}
      </div>
    </div>
  );
};
export default CollectionPreview;
