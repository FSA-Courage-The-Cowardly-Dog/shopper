import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { attemptGetTagList } from '../store/productSlice';
import { useParams } from 'react-router-dom';
import "../styling/Category.css"
import { Link } from 'react-router-dom';

function Category() {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  React.useEffect(() => {
    dispatch(attemptGetTagList(params.categories));
  }, []);

  const products = useSelector((state) => state.product.productList);
  
  return (

    <div>
      <div className="categoryHeader">
        
      </div>
      <section className='displayCostumes'>
      {products.map((product) => (
        <Link to={`/singleproduct/${product.id}`} className='costume'>
          <img className="image" src={product.img}/>
          <p className='costumeName'>{product.name}</p>
          <span className='costumePrice'>${product.price/100}</span>
        </Link>
      ))}
      </section>
    </div>
  );
}

export default Category;
