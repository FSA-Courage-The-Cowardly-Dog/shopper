import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { attemptGetProductList } from '../store/productSlice';
import '../styling/Mainpage.css';
import { Link } from 'react-router-dom';

function Welcome() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);
  React.useEffect(() => {
    dispatch(attemptGetProductList());
  }, []);

  return (
    <div className="categorySection">
      <h1 className="maintitle">Halloween Costumes</h1>

      <section className="categories">
        <Link to="/men/1" className="category" title="Mens Costumes">
          <img
            className="image"
            alt="men"
            src="https://target.scene7.com/is/image/Target/GUEST_8ec3d060-3009-41de-9e25-632de42e5368?wid=315&hei=315&qlt=60&fmt=webp"
          />
          <p className="category-name">Mens Costumes</p>
        </Link>
        <Link to="/women/1" className="category" title="Womens Costumes">
          <img
            className="image"
            alt="women"
            src="https://target.scene7.com/is/image/Target/GUEST_743dcbc7-2398-4a4d-a9f0-5db882167752?wid=315&hei=315&qlt=60&fmt=webp"
          />
          <p className="category-name">Womens Costumes</p>
        </Link>
        <Link to="/boy/1" className="category" title="Boys Costumes">
          <img
            className="image"
            alt="boy"
            src="https://target.scene7.com/is/image/Target/GUEST_2ded035b-2444-4a78-a27f-d5f2fe484789?wid=315&hei=315&qlt=60&fmt=webp"
          />
          <p className="category-name">Boys Costumes</p>
        </Link>
        <Link to="/girl/1" className="category" title="Girls Costumes">
          <img
            className="image"
            alt="girl"
            src="https://target.scene7.com/is/image/Target/GUEST_198eba94-48c5-478f-8a35-883eaae65fd5?wid=315&hei=315&qlt=60&fmt=webp"
          />
          <p className="category-name">Girls Costumes</p>
        </Link>
        <Link to="/baby/1" className="category" title="Baby Costumes">
          <img
            className="image"
            alt="baby"
            src="https://target.scene7.com/is/image/Target/GUEST_27c60cf8-05a5-412a-8454-1dfe6e398585?wid=315&hei=315&qlt=60&fmt=webp"
          />
          <p className="category-name">Baby Costumes</p>
        </Link>
        <Link to="/toddler/1" className="category" title="Toddler Costumes">
          <img
            className="image"
            alt="toddler"
            src="https://target.scene7.com/is/image/Target/GUEST_e1d4a7ff-dc61-46f8-9159-1988016d3fa5?wid=315&hei=315&qlt=60&fmt=webp"
          />
          <p className="category-name">Toddler Costumes</p>
        </Link>
      </section>
    </div>
  );
}

export default Welcome;
