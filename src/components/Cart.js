import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { attemptGetUserCart, attemptRemoveFromCart, attemptUpdateQtyInCart } from "../store/cartSlice";

const Cart = () => {
    const user = useSelector(state => state.user)
    const userCart = useSelector(state => state.cart)
    const [isLoaded, setIsLoaded] = useState(false);
    const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem('cart')));
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const validateInventory = () => {
        const boolArr = [];
        cart.lineItems.forEach(lineItem => {
            let singleProductItems = cart.lineItems.filter(item => item.productId === lineItem.productId)
            let count = 0;
            singleProductItems.forEach(item => count += item.quantity);
            boolArr.push(count <= lineItem.product.inventory)
        })
        return !boolArr.reduce((prev,next) => prev && next,true)
    }

    const removeFromUserCart = (lineItemId) => {
        async function updateCart() {
            setIsLoaded(false)
            await dispatch(attemptRemoveFromCart(lineItemId))
            setIsLoaded(true)
        }
        updateCart()
        window.location.reload(false)
    }

    const removeFromLocalCart = (productId, size) => {
        const localCart = JSON.parse(window.localStorage.getItem('cart'));
        let instance = localCart[productId].find(item => item.size === size)
        let index = localCart[productId].indexOf(instance)
        localCart[productId].splice(index, 1)
        window.localStorage.setItem('cart', JSON.stringify(localCart))
        setCart(localCart)
        window.location.reload(false)
    }

    const checkoutClickHandler = () => {
        navigate('/cart/checkout')
    }

    // don't love this implementation, but works for now
    const updateQtyForUserCart = (lineItemId) => (event) => {
        async function updateCart() {
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
                                                    Size: {lineItem.size}
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
                        {/* <Link to="/cart/checkout" className="checkout-link">Checkout</Link> */}
                        <button disabled={validateInventory()} onClick={()=> checkoutClickHandler()}>Go to Checkout</button>
                        <p className="inventory-item-warning">{!validateInventory() ? '' : 'Some item(s) quantity in cart exceed total product inventory'}</p>
                    </div>
                    : <div>no items in cart</div>
            )
            : (
                Object.entries(cart).length ?
                    <div className='cart-display'>
                        <h3>Items:</h3>
                        <ul>
                            {Object.entries(cart).map((pair,prodIdx) => {
                                return(
                                    pair[1].map((item,idx) => 
                                    // <li key={idx}>
                                    <li key={Number(prodIdx.toString()+idx.toString())}>
                                        <div className="cart-item-display">
                                            <img src={item.img} height='150px' width='150px'/>
                                            <div className="cart-item-details">  
                                                <Link to={`/singleproduct/${pair[0]}`}>{item.name}</Link>
                                                <div>
                                                    Unit Price: ${(item.price/100).toFixed(2)}
                                                </div>
                                                <div>
                                                    Size: {item.size}
                                                </div>
                                                <div>
                                                    Qty:  <input type='number' defaultValue={item.qty} min='1' onChange={updateQtyForLocalCart(pair[0])}/>
                                                </div>
                                                <button 
                                                    className='delete-from-cart' 
                                                    type='click' 
                                                    onClick={() => removeFromLocalCart(pair[0], item.size)}>
                                                        Remove from cart
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    )
                                )
                            })}
                        </ul>
                        <div>Create account or sign in to existing account to checkout</div>
                    </div>
                    : <div>no items in cart</div>
            )
    )
};

// add in validation to make sure that lineItem total quantities do not exceed product quantity
// could write methods for both local and user cart; user cart will be easier;
// honestly, maybe only need to add for user cart since not allowing local cart checkout anyways
// if time, could go back and add in local user validation as well;

export default Cart;