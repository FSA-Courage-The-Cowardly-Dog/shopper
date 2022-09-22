import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { attemptGetTagList } from "../store/productSlice";
import { useParams } from 'react-router-dom';

function Category() {
    const dispatch = useDispatch()
   const params = useParams()
    console.log(params)

	React.useEffect(() => {
		dispatch(attemptGetTagList(params.categories));
	  }, []);
    
    const products = useSelector((state) => state.product.productList)

  return (
    <div>
        {/* {products.map((product) => <img src={product.img} />)} */}
    </div>
  )
}

export default Category