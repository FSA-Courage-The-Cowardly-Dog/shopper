import React, { useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
    const user = useSelector(state => state.user);
    const [cart, setCart] = useState({})

    return(
        <div>
            <div>Placeholder for cart</div>
            <div>Will probably want to have App.js or Userbar.js have a reference to cart</div>
            <div>That way, can display num of line items next to cart Link</div>
        </div>
    )
};

// for now, save localstorage cart as an object: {productId: qty}; will have multiple productIds as keys

export default Cart;