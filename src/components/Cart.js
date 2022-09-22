import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attemptGetUserCart, attemptRemoveFromCart, attemptUpdateQtyInCart } from "../store/cartSlice";

const Cart = () => {
    const userCart = useSelector(state => state.cart)
    const [isLoaded, setIsLoaded] = useState(false);
    const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem('cart')));
    const dispatch = useDispatch();

    React.useEffect(() => {
        async function loadUserCart() {
            await dispatch(attemptGetUserCart())
            setIsLoaded(true);
        }
        const token = window.localStorage.getItem('token');
        if (token) {
            loadUserCart()
        }
    },[])
    React.useEffect(() => {
        if (isLoaded) {
            setCart(userCart)
        }
    },[isLoaded])
    // something finicky when logging in when on cart page; need to refresh page to see updated cart

    const removeFromUserCart = (lineItemId) => {
        async function updateCart() {
            // workaround for how to update component without refreshing
            setIsLoaded(false)
            await dispatch(attemptRemoveFromCart(lineItemId))
            setIsLoaded(true)
        }
        updateCart()
    }

    const removeFromLocalCart = (productId) => {
        const localCart = JSON.parse(window.localStorage.getItem('cart'));
        delete localCart[productId];
        window.localStorage.setItem('cart', JSON.stringify(localCart))
        setCart(localCart)
    }

    // don't love this implementation, but works for now
    const updateQtyForUserCart = (lineItemId) => (event) => {
        async function updateCart() {
            // workaround for how to update component without refreshing
            setIsLoaded(false)
            await dispatch(attemptUpdateQtyInCart(lineItemId,event.target.value))
            setIsLoaded(true)
        }
        updateCart()
    }

    // non-elegant way to update, but functionality should work for skeleton framework for site
    const updateQtyForLocalCart = (productId) => (event) => {
        const localCart = JSON.parse(window.localStorage.getItem('cart'));
        localCart[productId] = event.target.value;
        window.localStorage.setItem('cart', JSON.stringify(localCart))
        setCart(localCart)
    }

    return(
        cart.lineItems ? 
            (
                cart.lineItems.length ?
                    <div className='cart-display'>
                        <h3>Items:</h3>
                        <ul>
                            {cart.lineItems.map((lineItem,idx) => {
                                return(
                                    <li key={idx}>
                                        <span>{`Product Id: ${lineItem.productId}, Qty: `} <input type='number' defaultValue={lineItem.quantity} onChange={updateQtyForUserCart(lineItem.id)}/></span>
                                        <button 
                                            className='delete-from-cart' 
                                            type='click'
                                            onClick={() => removeFromUserCart(lineItem.id)}>
                                                X
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    : <div>no items in cart</div>
            )
            : (
                Object.entries(cart).length ?
                    <div className='cart-display'>
                        <h3>Items:</h3>
                        <ul>
                            {Object.entries(cart).map((pair,idx) => {
                                return(
                                    <li key={idx}>
                                        {/* for now, can just update cart quantity whenever number is changed
                                            Ideally, will only update cart quantity if user hits a 'save change' button
                                            Will look into adding that functionality later
                                        */}
                                        <span>{`Product Id: ${pair[0]}, Qty: `}<input type='number' defaultValue={pair[1]} min='1' onChange={updateQtyForLocalCart(pair[0])}/></span>
                                        <button 
                                            className='delete-from-cart' 
                                            type='click' 
                                            onClick={() => removeFromLocalCart(pair[0])}>
                                                X
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    : <div>no items in cart</div>
            )
    )
};

// also, can look into creating a modify button to change the qty of line items, but that can be done later
// eventually, will want to be able to display product name instead of product id; will have to think about how to do that
// -- should be relatively straightforward for when user logged in; can modify getCart() method to have lineItems include Product model
// -- for guest experience, will be a little trickier

export default Cart;