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
  // could probably write increment/decrement for +/- buttons
  // or, just look into styling the number input like that
  const num = document.getElementById('counternum')


  
  function plus() {
    let a = +num.innerHTML
    a++
    num.innerHTML = a
  }

  function minus() {
    let a = +num.innerHTML
    if (a > 1) {
      a--
      num.innerHTML = a
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
    return Number(qty) === 0 || !size.length;
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
    
    <div className="productInfo sizeSelector">
        <form action="#">
          <select className='sizeselector' name="languages" id="lang" onChange={sizeChangeHandler}>
            <option value="select">Select Size:</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">X-Large</option>
          </select>
        </form>
    </div>

    <div className="productInfocounter">
      <span onClick={minus} className='minus'>-</span>
      <span id='counternum'>1</span>
      <span onClick={plus} className='plus'>+</span>
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
      <img className='prodImg' src={product.img} style={{maxHeight: '500px',maxWidth: '500px'}}/>
    </div>

  </div>
  : <></>
  )
}

export default SingleProduct