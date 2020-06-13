export const addItemToCart = (cartItems, cartItemToAdd) => {
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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem._id === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem._id !== cartItemToRemove._id);
  }

  return cartItems.map(cartItem =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
export const syncCartItems = (cartItems, cartItemsToAdd) => {
  if (JSON.stringify(cartItems) !== JSON.stringify(cartItemsToAdd)) {
    cartItemsToAdd.forEach(item => {
      const existingCartItem = cartItems.find(
        cartItem => cartItem._id === item._id
      );
      if (existingCartItem) {
        existingCartItem.quantity += item.quantity
      } else {
        cartItems = [...cartItems, {
          ...item
        }];
      }
    });
  }
  return cartItems
};