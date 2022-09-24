import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { attemptGetUserCart, attemptRemoveFromCart, attemptUpdateQtyInCart } from "../store/cartSlice";

const Cart = () => {
    const user = useSelector(state => state.user)
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
            // window.location.reload(false)
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
        // noticed that when deleting, quantity inputs aren't updating; refresh is workaround for now
        // ideally do not want to refresh when removing items; will look into how to change that later
        window.location.reload(false)
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
        localCart[productId].qty = event.target.value;
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
                                        <div className="cart-item-display">
                                            <img src={lineItem.product.img} height='150px' width='150px'/>
                                            <div className="cart-item-details">
                                                <Link to={`/singleproduct/${lineItem.productId}`}>{lineItem.product.name}</Link>
                                                <div>
                                                    Unit Price: ${(lineItem.product.price/100).toFixed(2)}
                                                </div>
                                                <div>
                                                    (PLACEHOLDER FOR SIZE)
                                                </div>
                                                <div>
                                                    Qty:  <input type='number' defaultValue={lineItem.quantity} onChange={updateQtyForUserCart(lineItem.id)}/>
                                                </div>
                                                <button 
                                                    className='delete-from-cart' 
                                                    type='click'
                                                    onClick={() => removeFromUserCart(lineItem.id)}>
                                                        Remove from cart
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <Link to="/cart/checkout" className="checkout-link">Checkout</Link>
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
                                        <div className="cart-item-display">
                                            <img src={pair[1].img} height='150px' width='150px'/>
                                            <div className="cart-item-details">  
                                                <Link to={`/singleproduct/${pair[0]}`}>{pair[1].name}</Link>
                                                <div>
                                                    Unit Price: ${(pair[1].price/100).toFixed(2)}
                                                </div>
                                                <div>
                                                    (PLACEHOLDER FOR SIZE)
                                                </div>
                                                <div>
                                                    Qty:  <input type='number' defaultValue={pair[1].qty} min='1' onChange={updateQtyForLocalCart(pair[0])}/>
                                                </div>
                                                <button 
                                                    className='delete-from-cart' 
                                                    type='click' 
                                                    onClick={() => removeFromLocalCart(pair[0])}>
                                                        Remove from cart
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <div>Create account or sign in to existing account to checkout</div>
                    </div>
                    : <div>no items in cart</div>
            )
    )
};

// eventually, will want to be able to display product name instead of product id; will have to think about how to do that
// -- should be relatively straightforward for when user logged in; can modify getCart() method to have lineItems include Product model
// -- for guest experience, will be a little trickier; will need to fetch product info using productId somehow for each cart element
// -- alternatively, could save more info in local storage, such as product name at the very least.

export default Cart;