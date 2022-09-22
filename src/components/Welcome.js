import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { attemptGetProductList } from "../store/productSlice";
import "../styling/Mainpage.css"
import { Link } from "react-router-dom";

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
				<ul>

					<li>
						<Link to='/men'> Mens Costumes</Link>
					</li>
					<li>
						<Link to='/women'>Womans Costumes</Link>
					</li>
					<li>
					<Link to='/boy'>Boys Costumes</Link>
					</li>
					<li>
					<Link to='/girl'> Girls Costumes</Link>
					</li>
					<li>
					<Link to='/baby'> baby Costumes</Link>
					</li>
					<li>
					<Link to='/toddler'>Toddler Costumes</Link>
					</li>
				</ul>
				{/* <div className="mensCostumes"> */}
					{/* <img className="categoryImg" src="https://www.rd.com/wp-content/uploads/2021/08/20-costume-ideas-for-men-he-ll-love-opener.jpg?fit=700,700"/>
				</div>

				<div className="womansCostumes">
					<img className="categoryImg" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/halloween-costumes-for-women-1658349112.jpg?crop=0.490xw:0.981xh;0.00321xw,0.00641xh&resize=640:*"/>
				</div>

				<div className="boysCostumes">
					<img className="categoryImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKQyXf2UzPtmzJ9jQg4gYf7ZQCyKXQaEcrQ&usqp=CAU"/>
				</div>

				<div className="girlsCostumes">
					<img className="categoryImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEFn_dXYW3pWD86vAdPRM6hFCbO8FqZVA6zw&usqp=CAU"/>
				</div>

				<div className="babyCostumes">
					<img className="categoryImg" src="" />
				</div> */}
			</div>
  
		</div>
		
	);
}

export default Welcome;
