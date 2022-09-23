import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { attemptAddToCart } from '../store/cartSlice';
import { attemptGetSingleProduct, attemptUnmountSingleProduct } from "../store/productSlice";
import '../styling/SingleProduct.css'

function SingleProduct() {
  const params = useParams();
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product.singleProduct)
  React.useEffect(() => {
    dispatch(attemptGetSingleProduct(params.id))
    return () => {
      dispatch(attemptUnmountSingleProduct());
    };
  }, []);
  const [qty, setQty] = useState(0)

  const addToCartHandler = (productId) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(attemptAddToCart(productId,Number(qty)))
    } else {
      const localCart = JSON.parse(window.localStorage.getItem('cart'));
      if (localCart[productId]) {
        localCart[productId].qty = Number(localCart[productId].qty) + Number(qty);
      } else {
        localCart[productId] = {qty, name: product.name, price: product.price};
      }
      window.localStorage.setItem('cart', JSON.stringify(localCart))
    }
  }
  // could probably write increment/decrement for +/- buttons
  // or, just look into styling the number input like that
  const qtyChangeHandler = (event) => {
    setQty(event.target.value)
  }
  const checkDisabled = () => {
    return Number(qty) === 0;
  }

  return ( product ?
    <div >
      <div className='prodInfoBlock'>
    <div className='productInfo'>
        <h2>{product.name}</h2>
         <div className="infoBlock">
            <div className="productPrice">
               <h3>{product.price}</h3>
            </div>
         </div>
    </div>
    
    <div className="productInfo sizeSelector">
        <form action="#">
          <select name="languages" id="lang">
            <option value="select">Select Size:</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">X-Large</option>
          </select>
        </form>
    </div>

    <div className="productInfo counter">
      <form id='myform' method='POST' className='quantity' action='#'>
        <p className='counterLabel'>Quantity</p>
        <input type='button' value='-' className='qtyminus minus' field='quantity' />
        <input id='single-product-qty' type='number' name='quantity' defaultValue='0' min='0' onChange={qtyChangeHandler}/>
        <input type='button' value='+' className='qtyplus plus' field='quantity' />
        {/* changed input type to number from text; didn't hook up buttons, but able to toggle in input itself */}
      </form>
    </div>

    <div className="productInfo addToCart">
        <button className='addToCart' disabled={checkDisabled()} onClick={() => addToCartHandler(product.id)}>
          <div className="cart">Add To Cart</div>
        </button>
    </div>

    <div className="description">
      <h4>Descripton</h4>
      <p>{product.description}</p>
    </div>

    </div>

    <div className="imageContainer">
      <img className='prodImg' src={product.img} style={{maxHeight: '300px',maxWidth: '300px'}}/>
    </div>

  </div>
  : <></>
  )
}

export default SingleProduct