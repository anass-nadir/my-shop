export const addItemToCart = (
  cartItems: IProduct[],
  cartItemToAdd: IProduct
): IProduct[] => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem._id === cartItemToAdd._id
  );
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (
  cartItems: IProduct[],
  cartItemToRemove: IProduct
): IProduct[] => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem._id === cartItemToRemove._id
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter(cartItem => cartItem._id !== cartItemToRemove._id);
  }

  return cartItems.map(cartItem =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
export const getCartTotal = (cartItems: IProduct[]) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  );

export const getCartItemsCount = (cartItems: IProduct[]) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  );
