import './cartItem.scss';

const CartItem = ({ imagesUrls, price, name, quantity }: IProduct) => (
  <div className='cart-item'>
    {(imagesUrls?.length &&
      imagesUrls.map(image => <img src={image} alt='item' />)) ||
      null}
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartItem;
