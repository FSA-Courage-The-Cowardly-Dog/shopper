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

// in another file, likely App.js, will want to set localstorage variable for cart
// can make a couple checks: if !user, set cart to localstorage cart, will need to stringify and parse to/from json
// if user is logged in, check if local storage cart has items; then, add those items

// another idea: can just save Order model id of unassigned instance
// then, if no user logged in, can fetched cart using that order id
// if user then logs in, can check if local instance has items, then move those over. then, remove all items from local instance

export default Cart;