import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  attemptGetTagList,
  setItemsPerPage,
  setPriceOrder,
} from '../store/productSlice';
import { useParams, useSearchParams } from 'react-router-dom';
import PageNavigation from './PageNavigation';
import '../styling/Category.css';
import { Link } from 'react-router-dom';
function Category() {
  const dispatch = useDispatch();
  const params = useParams();
  let searchParams = useSearchParams()[0];
  let itemsperpage = useSelector((state) => state.product.itemsPerPage);
  let priceOrder = useSelector((state) => state.product.priceOrder);
  React.useEffect(() => {
    dispatch(setPriceOrder(''));
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(
      attemptGetTagList(
        params,
        itemsperpage,
        priceOrder,
        searchParams.get('for')
      )
    );
  }, [params, dispatch, itemsperpage, priceOrder, searchParams]);

  const handleChangeView = (event) => {
    let newItemsPerPage = Number(event.target.value);
    dispatch(setItemsPerPage(newItemsPerPage));
  };

  const handlePriceChangeView = (event) => {
    console.log('hi', event);
    dispatch(setPriceOrder(event.target.value));
  };
  const products = useSelector((state) => state.product.productList);

  return products ? (
    <div>
      <div className="categoryHeader">
        <div className="categoryHeaderLeft">
          <div className="sortby">
            <label className="sortbylabel">Sort by:</label>
            <select
              className="sortbymenu"
              onChange={(e) => handlePriceChangeView(e)}
            >
              <option value="" selected="selected">
                Choose one
              </option>
              <option value="ASC">Price - Low to High </option>
              <option value="DESC">Price - High to Low </option>
            </select>
          </div>
        </div>

        <div className="categoryHeaderMiddle">
          <div className="pageview">
            <label className="viewlabel">View:</label>
            <select className="viewmenu" onChange={(e) => handleChangeView(e)}>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={30}>30 per page</option>
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
  ) : (
    <div>Loading...</div>
  );
}

export default Category;
