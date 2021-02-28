import CartActionType from './cart.types';
import {addToCart, removeItemFromCart} from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionType.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        
        case CartActionType.ADD_ITEMS:
            return{
                ...state,
                cartItems: addToCart(state.cartItems, action.payload)
            };

        case CartActionType.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            };

        case CartActionType.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
            };
        default:
            return state;
    }
}

export default cartReducer;