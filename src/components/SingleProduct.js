import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { attemptGetProductList } from "../store/productSlice";
import '../styling/SingleProduct.css'

function SingleProduct() {

      const dispatch = useDispatch()
      const products = useSelector((state) => state.product.productList)
      React.useEffect(() => {
          dispatch(attemptGetProductList());
        }, []);
        // try to wire this up after cart functionality built out
        

  return (
    <div >
      <div className='prodInfoBlock'>
    <div className='productInfo'>
        <h2>Adult The Joker Suit - Batman</h2>
         <div className="infoBlock">
            <div className="productPrice">
               <h3>$59.99</h3>
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

    <div class="productInfo counter">
      <form id='myform' method='POST' class='quantity' action='#'>
        <p className='counterLabel'>Quantity</p>
        <input type='button' value='-' class='qtyminus minus' field='quantity' />
        <input type='text' name='quantity' value='0' class='qty' />
        <input type='button' value='+' class='qtyplus plus' field='quantity' />
      </form>
    </div>

    <div className="productInfo addToCart">
        <button className='addToCart'>
          <div className="cart">Add To Cart</div>
        </button>
    </div>

    <div className="description">
      <h4>Descripton</h4>
      <p>To infinity, and beyond! Bring your favorite movie to life when you wear this officially licensed Buzz Lightyear costume. Featuring a jumpsuit with an attached chest piece and a hood, this costume provides everything you need to take flight this Halloween!</p>
    </div>

    </div>

    <div className="imageContainer">
      <img className='prodImg' src='data:image/jpeg;base64,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'/>
    </div>

</div>
    
  )
}

export default SingleProduct