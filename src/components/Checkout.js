import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { attemptCheckout, attemptGetUserCart, attemptStripeCheckout, attemptUpdateOrderAddress } from "../store/cartSlice";
import Toastify from 'toastify-js'

const Checkout = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [address, setAddress] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            navigate('/cart')
        }
        async function loadCart () {
            await dispatch(attemptGetUserCart())
            setIsLoaded(true)
        }
        loadCart()
    },[])
    React.useEffect(() => {
        if (isLoaded) {
            if (!cart.lineItems.length) {
                navigate('/cart')
            }
            if (cart.address) {
                setAddress(cart.address)
            }
            let sumArr = cart.lineItems.map(lineItem => lineItem.quantity * lineItem.product.price)
            let sum = sumArr.reduce((prev, curr) => prev + curr, 0)
            setTotal(sum)
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

    const checkDisabled = () => {
        if (address) {
            return !address.length || validateInventory();
        }
        return true;
    }

    const handleChange = (event) => {
        setAddress(event.target.value)
    }

    const checkoutHandler = () => {
        if (address !== cart.address) {
            dispatch(attemptUpdateOrderAddress(address))
        }
        dispatch(attemptStripeCheckout(cart.lineItems))
    }

    return(
        cart.lineItems ?
            <div className="checkout-item-details">
                <h2 className="checkout-header">Order Details:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.lineItems.map((lineItem,idx)=> {
                            return(
                                <tr key={idx}>
                                    <td>{lineItem.product.name}</td>
                                    <td>${(lineItem.product.price/100).toFixed(2)}</td>
                                    <td>{lineItem.quantity}</td>
                                    <td>${(lineItem.quantity*lineItem.product.price/100).toFixed(2)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='checkout-total'>Total: ${(total/100).toFixed(2)}</div>
                <div className="order-address">
                    Shipping Address: <input id="order-address" name="address" type='text' value={address} onChange={handleChange}/>
                </div>
                <div className={address.length ? 'hidden-address-warning' : 'address-warning'}>Please enter your address</div>
                <div className="cart-link-complete-purchase-line">
                    <Link to="/cart" className="back-to-cart-link">Back to cart</Link>
                    <button className="complete-purchase" onClick={checkoutHandler} disabled={checkDisabled()}>Complete Purchase Through Stripe</button>
                </div>

                <div className='inventory-item-warning'>
                <p className="inventory-item-warning">{!validateInventory() ? '' : 'Some item(s) quantity exceeds total product inventory. Checkout disabled until item(s) updated with valid quantity. Please return to cart to fix.'}</p>
                </div>
            </div>
            : <></>
    )
}

export default Checkout
