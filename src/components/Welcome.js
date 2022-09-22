import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { attemptGetProductList } from "../store/productSlice";

function Welcome() {
	const dispatch = useDispatch()
	const products = useSelector((state) => state.product.productList)

	React.useEffect(() => {
		dispatch(attemptGetProductList());
	  }, []);

	return (
		products ? 
		<div className="container">

			   {products.map((product) => <img src={product.img}/>)}	
		</div>
		: <div className="alternate">

		</div>
	);
}

export default Welcome;
