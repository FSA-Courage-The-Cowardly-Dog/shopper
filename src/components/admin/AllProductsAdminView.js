import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { attemptGetProductList, getProductsByPage, attemptGetAllTags } from '../../store/productSlice';
import Toastify from 'toastify-js'

const AllProductsAdminView = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.product.productList);
  const totalProducts = useSelector((state) => state.product.count)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector((state) => state.product.tagsList)
  const [searchParams] = useSearchParams();
  const [page, setPage]  = useState(searchParams.get('page'))
  const [sortByName, setSortByName] = useState(false)
  const [filter, setFilter] = useState('')
  const [loaded, setLoaded] = useState(false)

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if ((user.id && !user.isAdmin) || !token) {
      navigate('/');
      Toastify({text: `Not authorized for admin portal`, duration:2500 ,gravity: "bottom", position: "right", backgroundColor: "red"}).showToast();
    }
    if (!tags) {
      dispatch(attemptGetAllTags())
    }
    async function load () {
      setLoaded(false)
      // not most efficient having to always call this function to set product count
      await dispatch(attemptGetProductList(filter))
      await dispatch(getProductsByPage(page, sortByName, filter))
      setLoaded(true)
    }
    if (page) {
      load();
    } else {
      dispatch(attemptGetProductList());
    }
  }, [user.id, page, sortByName, filter]);

  const handleTagFilterChange = (event) => {
    event.target.value === 'all' ? setFilter('') : setFilter(event.target.value);
  }

  return loaded ? (
    <>
    <div className='allproducts-header'>
      <h1>All Products ({totalProducts})</h1>
      <div>
        <input type='checkbox' name='sort-name' defaultChecked={sortByName} onChange={() => setSortByName(!sortByName)}/>
        <label htmlFor='sort-name'>Sort by Name (Asc.)</label>
      </div>
      <div>
        <label htmlFor='tag-filter'>Filter by Category: </label>
        <select defaultValue='all' id='tag-selector'  onChange={handleTagFilterChange}>
          <option>{'all'}</option>
          {tags ? tags.map((tag,idx)=> <option key={idx}>{tag.name}</option>) : <></>}
        </select>
      </div>
      <div className='display-info'>
        <div className='display-text'>Displaying 25 users per page:</div>
        <div className="prev-next">
          <Link to={`/adminportal/allproducts?page=${Number(page)-1}`} className={Number(page) === 1 ? 'prevNext disabled' : 'prevNext'} onClick={() => setPage(+page-1)}>Prev</Link>
          <Link to={`/adminportal/allproducts?page=${Number(page)+1}`} className={page*25 >= totalProducts ? 'prevNext disabled' : 'prevNext'} onClick={() => setPage(+page+1)}>Next</Link>
        </div>
      </div>
    </div>
    <div id="all-products-table-container">
      <table id="all-products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Image Url</th>
            <th>Description</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <Link to={`/adminportal/modifyproduct/${product.id}`}>
                    {product.id}
                  </Link>
                </td>
                <td>{product.name}</td>
                <td>{(product.price/100).toFixed(2)}</td>
                <td>{product.inventory}</td>
                <td className="product-imgUrl">{product.img}</td>
                <td className="product-desc">{product.description}</td>
                <td>{product.tags.length ? product.tags.map(tag => tag.name.toUpperCase()).join(', ') : 'NO TAG'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='footer-nav-links'>
        <Link to="/adminportal" className='back-to-admin-link'>Back to portal</Link>
        <div className="prev-next">
          <Link to={`/adminportal/allproducts?page=${Number(page)-1}`} className={Number(page) === 1 ? 'prevNext disabled' : 'prevNext'} onClick={() => setPage(+page-1)}>Prev</Link>
          <Link to={`/adminportal/allproducts?page=${Number(page)+1}`} className={page*25 >= totalProducts ? 'prevNext disabled' : 'prevNext'} onClick={() => setPage(+page+1)}>Next</Link>
        </div>
      </div>
    </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default AllProductsAdminView;
