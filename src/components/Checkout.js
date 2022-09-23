import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { attemptCheckout, attemptGetUserCart, attemptUpdateOrderAddress } from "../store/cartSlice";

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

    // make clickHandler for 'Purchase' button
    // dispatch a thunk to call user.checkout()
    // then, redirect to an order confirmation page
    // something to think about: may want to move unitPrice into LineItem model
    // - otherwise, if product price changed at a later date order history wouldn't reflect accurate prices paid
    const handlePurchase = () => {
        if (address !== cart.address) {
            dispatch(attemptUpdateOrderAddress(address))
        }
        dispatch(attemptCheckout(total));
        navigate('/account/orderhistory')
    }

    const checkDisabled = () => {
        if (address) {
            return !address.length;
        }
        return true;
    }

    const handleChange = (event) => {
        setAddress(event.target.value)
    }

    return(
        cart.lineItems ?
            <div className="checkout-item-details">
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
                                    <td>{lineItem.product.price}</td>
                                    <td>{lineItem.quantity}</td>
                                    <td>{lineItem.quantity*lineItem.product.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <div>Total: {cart.lineItems.reduce((previous, current) => (previous.product.price * previous.quantity) + (current.product.price * current.quantity),0)}</div> */}
                <div>Total: {total}</div>
                <div className="order-address">
                    Shipping Address: <input id="order-address" name="address" type='text' value={address} onChange={handleChange}/>
                </div>
                <div className="cart-link-complete-purchase-line">
                    <Link to="/cart">Back to cart</Link>
                    <button className="complete-purchase" onClick={()=>handlePurchase()} disabled={checkDisabled()}>Purchase</button>
                </div>

            </div>
            : <></>
    )
}

export default Checkout