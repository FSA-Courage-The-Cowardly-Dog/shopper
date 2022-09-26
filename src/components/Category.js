import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { attemptGetTagList } from '../store/productSlice';
import { useParams } from 'react-router-dom';
import PageNavigation from './PageNavigation';
import '../styling/Category.css';
import { Link } from 'react-router-dom';

function Category() {
  const dispatch = useDispatch();
  const params = useParams();
  React.useEffect(() => {
    dispatch(attemptGetTagList(params));
  }, [params]);

  const products = useSelector((state) => state.product.productList);

  return (
    <div>
      <section className="displayCostumes">
        <PageNavigation />
        {products.map((product) => (
          <Link to={`/singleproduct/${product.id}`} className="costume">
            <img className="image" src={product.img} />
            <p className="costumeName">{product.name}</p>
            <span className="costumePrice">${product.price / 100}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Category;
