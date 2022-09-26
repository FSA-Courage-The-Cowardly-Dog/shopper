import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { attemptGetOrderHistory, unsetOrderHistory } from '../store/orderHistorySlice';

const OrderConfirmationPage = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.orderHistory[0])

    React.useEffect(() => {
        dispatch(attemptGetOrderHistory())
        return () => {
          dispatch(unsetOrderHistory())
        } 
      },[])
    return(
        <div>
            <h2>Thank you for placing your order!</h2>
            {order ?
             <div className="order-confirmation-container">
                <div className='order-invoice-date-line'>
                    <h3>{`Invoice number: ${order.id}`}</h3>
                    <span className='order-date'>Date: {order.updatedAt.slice(0,10)}</span>
                </div>
                <div>Shipping address: {order.address}</div>
                <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                {order.lineItems.map((lineItem,idx) => {
                  return(
                    <tr key={idx}>
                      <td className='order-product-name'><Link to={`/singleproduct/${lineItem.product.id}`}>{lineItem.product.name}</Link></td>
                      <td className='order-size'>{lineItem.size}</td>
                      <td className='order-quantity'>{lineItem.quantity}</td>
                    </tr>
                  )
                })}  
                </tbody>
              </table>
              <div>
                Total: ${(order.checkoutPrice/100).toFixed(2)}
              </div>
             </div>   
             : <></>}
             <div>
                Save to your records. You can also review this order and all previous orders in your <Link to="/account/orderhistory">order history</Link> page in account settings
             </div>
        </div>
    )
}

export default OrderConfirmationPage;