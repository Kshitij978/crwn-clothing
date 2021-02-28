export const addToCart = (cartItems, addToCartItem) => {
    const existingCartItem = cartItems.find(cartItem => 
        cartItem.id === addToCartItem.id
    );

    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === addToCartItem.id 
            ? 
            {...cartItem, quantity: cartItem.quantity + 1} 
            :
            cartItem
        )
    }

    return [...cartItems, {...addToCartItem, quantity: 1}]
}; 

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(
        cartItem => 
        cartItem.id === cartItemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
        
}