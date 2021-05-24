import { addItem } from '../../redux/cart/slice';
import { useAppDispatch } from '../../redux/hooks';
import './collectionItem.scss';

const CollectionItem = (item: IProduct) => {
  const dispatch = useAppDispatch();
  const { name, price, imagesUrls } = item;
  return (
    <div className='collection-item'>
      {(imagesUrls?.length && (
        <div
          className='image'
          style={{
            backgroundImage: `url(${imagesUrls[0]})`
          }}
        />
      )) ||
        null}

      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <button
        className='custom-button inverted'
        onClick={() => dispatch(addItem(item))}
      >
        Add to cart
      </button>
    </div>
  );
};

export default CollectionItem;
