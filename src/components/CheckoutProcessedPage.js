import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { attemptCheckout, attemptGetUserCart } from "../store/cartSlice";
import Toastify from 'toastify-js'

// workaround way to be able to call user cart checkout method and properly update db
// correct way would be listening to stripe webhook, but for sake of time put together this hacky component
const CheckoutProcessedPage = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false)

    React.useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            navigate('/cart')
        }
        async function loadCart () {
            await dispatch(attemptGetUserCart())
            // await dispatch(attemptCheckout(100))
            setIsLoaded(true)
        }
        loadCart()
    },[])
    React.useEffect(() => {
        async function checkout() {
            let sumArr = cart.lineItems.map(lineItem => lineItem.quantity * lineItem.product.price)
            let sum = sumArr.reduce((prev, curr) => prev + curr, 0)
            await dispatch(attemptCheckout(sum));
            navigate('/cart/orderconfirmation')
            Toastify({text: "Order processed!", duration:2000 ,gravity: "bottom", position: "right", backgroundColor: "#ff8300"}).showToast();
        }
        if (isLoaded) {
            if (!cart.lineItems.length) {
                navigate('/cart')
            }
            checkout()
        }
    },[isLoaded])
    React.useEffect(() => {

    },[isLoaded])

    return(<div>Processing order...</div>)
}

export default CheckoutProcessedPage;