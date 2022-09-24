import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptGetOrderHistory, unsetOrderHistory } from '../store/orderHistorySlice';

const OrderHistory = () => {
  const orders = useSelector(state => state.orderHistory)
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(attemptGetOrderHistory())
    return () => {
      dispatch(unsetOrderHistory())
    } 
  },[])

  return (
    orders.length ?
      <div className='order-history-container'>
        <h2 id='order-history-header'>Past Orders</h2>
        {orders.map((order,idx) => {
          return(
            // <div key={idx}>Order Id number: {order.id}</div>
            <div className='order-display-container' key={idx}>
              <h3>{`Invoice number: ${order.id}`}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                {order.lineItems.map((lineItem,idx) => {
                  return(
                    <tr key={idx}>
                      <td className='order-product-name'><Link to={`/singleproduct/${lineItem.product.id}`}>{lineItem.product.name}</Link></td>
                      <td className='order-quantity'>{lineItem.quantity}</td>
                    </tr>
                  )
                })}  
                </tbody>
              </table>
              <div className='order-total'>{`Total: $${((order.checkoutPrice)/100).toFixed(2)}`}</div>
            </div>
          )
        })}
      </div>
      : <div>No orders to display</div>
  )

};

export default OrderHistory;
