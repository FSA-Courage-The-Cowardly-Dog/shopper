import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { attemptGetTagList } from '../store/productSlice';
import { useParams } from 'react-router-dom';
import PageNavigation from './PageNavigation';
function Category() {
  const dispatch = useDispatch();
  const params = useParams();
  React.useEffect(() => {
    dispatch(attemptGetTagList(params));
  }, [params]);

  const products = useSelector((state) => state.product.productList);

  return (
    <div>
      <PageNavigation />
      {products.map((product) => (
        <img src={product.img} key={product.id} />
      ))}
    </div>
  );
}

export default Category;
