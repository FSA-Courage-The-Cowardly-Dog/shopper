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
		<div className="container">
			<h1>Halloween Costumes</h1>
			<div className="categories">
				<img src=""/>
			</div>
  
		</div>
		
	);
}

export default Welcome;
