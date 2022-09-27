import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { attemptCreateNewProduct, attemptGetAllTags } from '../../store/productSlice';
import Toastify from 'toastify-js';

const AddNewProduct = () => {
  const user = useSelector((state) => state.user);
  const tags = useSelector((state) => state.product.tagsList)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    inventory: '',
    img: '',
    description: '',
  });
  const [tag, setTag] = useState('')

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if ((user.id && !user.isAdmin) || !token) {
      navigate('/');
      Toastify({text: `Not authorized for admin portal`, duration:2500 ,gravity: "bottom", position: "right", backgroundColor: "red"}).showToast();
    }
    dispatch(attemptGetAllTags());
  }, [user.id]);

  const handleChange = (props) => (event) => {
    setForm({
      ...form,
      [props]: event.target.value,
    });
  };
  const handleTagChange = (event) => {
    event.target.value === '<select category>' ? setTag('') : setTag(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let product = { ...form };
    product.price = Number(product.price);
    product.inventory = Number(product.inventory);
    await dispatch(attemptCreateNewProduct(product, tag));
    navigate('/adminportal');
    Toastify({text: `New product created: ${form.name}!`, duration:2500 ,gravity: "bottom", position: "left", backgroundColor: "#ff8300"}).showToast();
  };

  const checkDisabled = () => {
    return !form.name.length || !form.price.length || !form.inventory.length || !tag.length;
  };

  return (
    <div className='newProduct' id="new-product-form-container">
      <form id="new-product-form" onSubmit={handleSubmit}>
        <h2 className='newproducttitle'>New Product Form</h2>
        <div className="form-line">
          
          <input
          className='newproductform'
          placeholder='Name'
            name="name"
            value={form.name}
            onChange={handleChange('name')}
          />
        </div>
        <div className="form-line">
          
          <input
          className='newproductform'
          placeholder='Price (in cents)'
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange('price')}
          />
        </div>
        <div className="form-line">
      
          <input
          className='newproductform'
          placeholder='Inventory'
            name="inventory"
            type="number"
            value={form.inventory}
            onChange={handleChange('inventory')}
          />
        </div>
        <div className="form-line">
          
          <input
          className='newproductform'
          placeholder='Image Link'
            name="img"
            type="url"
            value={form.img}
            onChange={handleChange('img')}
          />
        </div>
        <div className="form-line">
          
          <input
          className='newproductform'
          placeholder='Description'
            name="description"
            value={form.description}
            onChange={handleChange('description')}
          />
        </div>
        <div className="form-line">
          <select className='newproductform' defaultValue='<select category>' id='tag-selector' onChange={handleTagChange}>
            <option>{'<select category>'}</option>
            {tags ? tags.map((tag,idx)=> <option key={idx}>{tag.name}</option>) : <></>}
          </select>
        </div>
      </form>
      <button className='newproductbtn' type="submit" disabled={checkDisabled()}>
          Create Product
        </button>
      <Link className='adminportallink' to="/adminportal">Back to portal</Link>
    </div>
  );
};

export default AddNewProduct;
