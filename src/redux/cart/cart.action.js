import CartActionType from './cart.types';

export const toggleCartHidden = () => (
    {
        type: CartActionType.TOGGLE_CART_HIDDEN
    }
)

export const addItems = item => ({
    type: CartActionType.ADD_ITEMS,
    payload: item 
});

export const removeItems = item => ({
    type: CartActionType.REMOVE_ITEM,
    payload: item
});

export const clearItemFromCart = item => ({
    type: CartActionType.CLEAR_ITEM_FROM_CART,
    payload: item
})