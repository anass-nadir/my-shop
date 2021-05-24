import { useAppDispatch } from '../../redux/hooks';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/slice';

import './checkoutItem.scss';

const CheckoutItem = (cartItem: IProduct) => {
  const dispatch = useAppDispatch();
  const { name, imagesUrls, price, quantity } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        {(imagesUrls?.length &&
          imagesUrls.map(image => <img src={image} alt='item' />)) ||
          null}
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => dispatch(removeItem(cartItem))}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => dispatch(addItem(cartItem))}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div
        className='remove-button'
        onClick={() => dispatch(clearItemFromCart(cartItem))}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
