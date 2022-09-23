import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { attemptGetUserCart } from "../store/cartSlice";

const Checkout = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(attemptGetUserCart())
    },[])

    // make clickHandler for 'Purchase' button
    // dispatch a thunk to call user.checkout()
    // then, redirect to an order confirmation page
    // something to think about: may want to move unitPrice into LineItem model
    // - otherwise, if product price changed at a later date order history wouldn't reflect accurate prices paid

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
                                    {/* when product price changed in db to integer, divide by 100 in above line */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>Total: (sum up subtotals)</div>
                <div className="order-address">
                    Shipping Address: (input for user address here; cannot purchase if address blank)
                </div>
                <div className="cart-link-complete-purchase-line">
                    <Link to="/cart">Back to cart</Link>
                    <button className="complete-purchase">Purchase</button>
                </div>

            </div>
            : <></>
    )
}

export default Checkout