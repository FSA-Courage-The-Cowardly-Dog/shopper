import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { attemptGetTagList, setItemsPerPage } from '../store/productSlice';
import { useParams } from 'react-router-dom';
import PageNavigation from './PageNavigation';
import '../styling/Category.css';
import { Link } from 'react-router-dom';
function Category() {
  const dispatch = useDispatch();
  const params = useParams();
  let itemsperpage = useSelector((state) => state.product.itemsPerPage);
  React.useEffect(() => {
    dispatch(attemptGetTagList(params, itemsperpage));
  }, [params, dispatch, itemsperpage]);
  const handleChangeView = (event) => {
    let newItemsPerPage = Number(event.target.value);
    dispatch(setItemsPerPage(newItemsPerPage));
  };
  const products = useSelector((state) => state.product.productList);

  return (
    <div>
      <div className="categoryHeader">
        <div className="categoryHeaderLeft">
          <div className="sortby">
            <label className="sortbylabel">Sort by:</label>
            <select className="sortbymenu">
              <option value="SortByDefault" selected="selected">
                Choose one
              </option>
              <option value="SortByPriceAscending">Price - Low to High </option>
              <option value="SortByPriceDescending">
                Price - High to Low{' '}
              </option>
            </select>
          </div>
        </div>

        <div className="categoryHeaderMiddle">
          <div className="pageview">
            <label className="viewlabel">View:</label>
            <select className="viewmenu" onChange={(e) => handleChangeView(e)}>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
              <option value={72}>72 per page</option>
            </select>
          </div>
        </div>

        <div className="categoryHeaderRight">
          <div className="pagenumber">
            <PageNavigation />
          </div>
        </div>
      </div>
      <section className="displayCostumes">
        {products.map((product) => (
          <Link to={`/singleproduct/${product.id}`} className="costume">
            <img className="image" src={product.img} alt={product.name} />
            <p className="costumeName">{product.name}</p>
            <span className="costumePrice">${product.price / 100}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Category;
