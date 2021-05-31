import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

import CollectionItem from '../collectionItem/collectionItem';

import './collection.scss';
interface ParamTypes {
  collectionId: string;
}
export const CollectionPage = () => {
  const params = useParams<ParamTypes>();
  const { products, category } = useAppSelector(
    ({ product: { inventory } }) =>
      inventory.filter(
        (pr: IInventory) => pr.category._id === params.collectionId
      )[0] || []
  ) as IInventory;

  return (
    <div className='collection-page-container'>
      <h2 className='collection-title'>{category?.title}</h2>
      <div className='collection-items-container'>
        {products ? (
          products.map(item => <CollectionItem key={item._id} {...item} />)
        ) : (
          <h1>No Product Found</h1>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
