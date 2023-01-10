import { useReducer } from "react";

import CartContext from "./CartContext";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        // state.items - items in the current snapshot - first argument in the cartReducer
        // concat() - adds a new item to an array but unlike push, it doesn't edit the existing array but return a new array
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
};

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        });        
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
    );
};

export default CartProvider;