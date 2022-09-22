import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attemptGetUserCart } from "../store/cartSlice";

const Cart = () => {
    const user = useSelector(state => state.user);
    const userCart = useSelector(state => state.cart)
    const [isLoaded, setIsLoaded] = useState(false);
    const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem('cart')));
    const dispatch = useDispatch();

    React.useEffect(() => {
        async function loadUserCart() {
            await dispatch(attemptGetUserCart(user.id))
            setIsLoaded(true);
        }
        if (user.id) {
            loadUserCart()
        }
    },[])
    React.useEffect(() => {
        if (isLoaded) {
            setCart(userCart)
        }
    },[])

    return(
        <div>
            <div>Placeholder for cart</div>
            <div>Will probably want to have App.js or Userbar.js have a reference to cart</div>
            <div>That way, can display num of line items next to cart Link</div>
        </div>
    )
};

// for now, save localstorage cart as an object: {productId: qty}; will have multiple productIds as keys

// functionality as guest should be:
// - check if user logged in; if not, let cart window.localstorage.getItem('cart')
// - when adding item, if not logged in, add productId and qty to the local storage cart; make sure to setItem after
// - when user logs in, check if localstorage.getItem("cart") has keys; if yes, then for each key, user.addToCart with productId, qty
// - after localstorage cart items added to user's cart, clear out localstorage cart; setItem("cart",{})

// make test file to test out methods; then, work on cartSlice.js file
// once cart working for users, work on localstorage cart
// one localstorage cart working, work on merging localstorage cart with user cart when logging in

export default Cart;