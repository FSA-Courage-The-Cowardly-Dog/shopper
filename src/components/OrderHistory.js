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
              <div className='order-invoice-date-line'>
                <h3>{`Invoice number: ${order.id}`}</h3>
                <span className='order-date'>Date: {order.updatedAt.slice(0,10)}</span>
              </div>
              <div className='order-status'>Order status: {order.status}</div>
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
                      {/* edge case to consider: if product deleted from db, then order history will break... */}
                      <td className='order-product-name'><Link to={`/singleproduct/${lineItem.product.id}`}>{lineItem.product.name}</Link></td>
                      <td className='order-size'>{lineItem.size}</td>
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
      : <div>
          <h2 id='order-history-header'>Past Orders</h2>
          <div className='order-history-none'>No orders to display; start shopping!</div>
        </div>
  )

};

export default OrderHistory;
