import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { attemptAddToCart } from '../store/cartSlice';
import { attemptGetSingleProduct, attemptUnmountSingleProduct } from "../store/productSlice";
import Toastify from 'toastify-js'
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
  const [qty, setQty] = useState(1)
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
    Toastify({text: "Added to cart!", duration:1500 ,gravity: "bottom", position: "right", backgroundColor: "green"}).showToast();
  }
  const num = document.getElementById('counternum')


  
  function plus() {
    let a = +num.innerHTML
    a++
    setQty(a)
    num.innerHTML = a
  }

  function minus() {
    let a = +num.innerHTML
    if (a > 1) {
      a--
      setQty(a)
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
    return !size.length || (Number(qty) > product.inventory);
  }

  return ( product ?
    <div className='single-product-container'>
      <div className="imageContainer">
      <img className='prodImg' src={product.img} style={{maxHeight: '500px',maxWidth: '500px'}}/>
    </div>
      <div className='prodInfoBlock'>
    <div className='productInfo'>
        <h2>{product.name}</h2>
            <div >
               <h3 className="productPrice">${((product.price)/100).toFixed(2)}</h3>
            </div> 
    </div>

    <div className='productInfo inventory'>
      <h4 className={product.inventory ? '' : 'out-of-stock'}>{product.inventory ? `${product.inventory} in stock!` : 'Out of stock'}</h4>
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
  
  </div>
  : <></>
  )
}

export default SingleProduct