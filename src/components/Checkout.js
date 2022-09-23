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

    const handlePurchase = () => {
        if (address !== cart.address) {
            dispatch(attemptUpdateOrderAddress(address))
        }
        async function checkout () {
            await dispatch(attemptCheckout(total));
            navigate('/account/orderhistory')
        }
        checkout();
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
                                    <td>{lineItem.product.price/100}</td>
                                    <td>{lineItem.quantity}</td>
                                    <td>{lineItem.quantity*lineItem.product.price/100}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>Total: {total/100}</div>
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
