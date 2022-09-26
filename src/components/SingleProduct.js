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
  const [size, setSize] = useState('')

  const addToCartHandler = (productId) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(attemptAddToCart(productId,Number(qty),size))
    } else {
      const localCart = JSON.parse(window.localStorage.getItem('cart'));
      if (localCart[productId]) {
        let containsSize = localCart[productId].find(item => item.size === size)
        if (containsSize) {
          containsSize.qty = Number(containsSize.qty) + Number(qty)
        } else {
          localCart[productId].push({qty, name: product.name, price: product.price, img: product.img, size})
        }
      } else {
        localCart[productId] = [{qty, name: product.name, price: product.price, img: product.img, size}];
      }
      window.localStorage.setItem('cart', JSON.stringify(localCart))
    }
  }
  const qtyChangeHandler = (event) => {
    setQty(event.target.value)
  }
  const incrementQty = () => {
    console.log('in incrememnt')
    document.getElementById('single-product-qty').value = +qty + 1
    setQty(+qty+1)
  }
  const decrementQty = () => {
    if (Number(qty)) {
      document.getElementById('single-product-qty').value = +qty-1
      setQty(+qty-1)
    }
  }
  const sizeChangeHandler = (event) => {
    if (event.target.value === 'Select Size:') {
      setSize('')
    } else {
      setSize(event.target.value)
    }
  }
  const checkDisabled = () => {
    return Number(qty) === 0 || !size.length || (Number(qty) > product.inventory);
  }

  return ( product ?
    <div className='single-product-container'>
      <div className='prodInfoBlock'>
    <div className='productInfo'>
        <h2>{product.name}</h2>
         <div className="infoBlock">
            <div className="productPrice">
               <h3>${((product.price)/100).toFixed(2)}</h3>
            </div>
         </div>
    </div>

    <div className='productInfo inventory'>
      <h4 className={product.inventory ? '' : 'out-of-stock'}>{product.inventory ? `${product.inventory} in stock!` : 'Out of stock'}</h4>
    </div>
    
    <div className="productInfo sizeSelector">
        <form action="#">
          <select name="languages" id="lang" onChange={sizeChangeHandler}>
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
        <input type='button' value='-' className='qtyminus minus' field='quantity' onClick={()=>decrementQty()}/>
        <input id='single-product-qty' type='number' name='quantity' defaultValue='0' min='0' onChange={qtyChangeHandler}/>
        <input type='button' value='+' className='qtyplus plus' field='quantity' onClick={() => incrementQty()}/>
        {/* changed input type to number from text; didn't hook up buttons, but able to toggle in input itself */}
      </form>
    </div>

    <p className='product-quantity-warning'>{(Number(qty) > product.inventory) && product.inventory ? 'Not enough product in stock; reduce quantity to be able to add to cart' : ''}</p>
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