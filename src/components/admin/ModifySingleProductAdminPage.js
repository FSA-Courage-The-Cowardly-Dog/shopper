import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  attemptChangeProductTag,
  attemptDeleteProduct,
  attemptGetAllTags,
  attemptGetSingleProduct,
  attemptRemoveTagFromProduct,
  attemptUnmountSingleProduct,
  attemptUpdateProduct,
} from '../../store/productSlice';
import Toastify from 'toastify-js'

const ModifySingleProductAdminPage = () => {
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product.singleProduct);
  const tags = useSelector((state) => state.product.tagsList)
  const [form, setForm] = useState({
    name: '',
    price: '',
    inventory: '',
    img: '',
    description: '',
  });
  const [newTag, setNewTag] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  React.useEffect(() => {
    async function loadProduct() {
      try {
        await dispatch(attemptGetAllTags());
        await dispatch(attemptGetSingleProduct(params.id));
        setIsLoaded(true);
      } catch (error) {
        navigate('/adminportal');
        Toastify({text: "Hmm... That product page doesn't exist.", duration:2000 ,gravity: "bottom", position: "right", backgroundColor: "red"}).showToast();
      }  
    }
    loadProduct();
    return () => {
      dispatch(attemptUnmountSingleProduct());
    };
  }, []);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if ((user.id && !user.isAdmin) || !token) {
      navigate('/');
      Toastify({text: `Not authorized for admin portal`, duration:2500 ,gravity: "bottom", position: "right", backgroundColor: "red"}).showToast();
    }
    if (isLoaded) {
      setForm(product);
    }
  }, [user.id, isLoaded]);

  const handleNewTagChange = (event) => {
    event.target.value === '<select category>' ? setNewTag('') : setNewTag(event.target.value);
  }

  const handleChange = (props) => (event) => {
    setForm({
      ...form,
      [props]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let productDetails = {
      name: form.name,
      price: Number(form.price),
      inventory: Number(form.inventory),
      img: form.img,
      description: form.description,
    };
    await dispatch(attemptUpdateProduct(productDetails, params.id, newTag));
    if (newTag.length) {
      window.location.reload(false)
    }
    Toastify({text: `Product changes saved!`, duration:2500 ,gravity: "bottom", position: "right", backgroundColor: "#ff8300"}).showToast();
  };

  const checkDisabled = () => {
    return (
      !form.name.length ||
      !form.price.toString().length ||
      !form.inventory.toString().length ||
      (!product.tags.length && !newTag.length)
    );
  };

  const removeTagHandler = (name) => {
    dispatch(attemptRemoveTagFromProduct(params.id, name))
    window.location.reload(false)
  }

  const changeTagHandler = (prevName, newName) => {
    dispatch(attemptChangeProductTag(params.id, prevName, newName))
  }

  const handleDelete = () => {
    dispatch(attemptDeleteProduct(params.id));
    navigate('/adminportal/allproducts?page=1');
    Toastify({text: `Product "${form.name}" deleted`, duration:2500 ,gravity: "bottom", position: "right", backgroundColor: "red"}).showToast();
  };

  return isLoaded ? (
    <div id="update-product-form-container">
      <form id="update-product-form" onSubmit={handleSubmit}>
        <h2 className='update-product-title'>Update Product Form</h2>
        <div className="update-form-line">
          <label htmlFor="name">Name: </label>
          <input
            className='editInput'
            name="name"
            value={form.name}
            onChange={handleChange('name')}
          />
        </div>
        <div className="update-form-line">
          <label htmlFor="price">Price: </label>
          <input
            className='editInput'
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange('price')}
          />
        </div>
        <div className="update-form-line">
          <label htmlFor="inventory">Inventory: </label>
          <input
            className='editInput'
            name="inventory"
            type="number"
            value={form.inventory}
            onChange={handleChange('inventory')}
          />
        </div>
        <div className="update-form-line">
          <label htmlFor="img">Image Link: </label>
          <input
            className='editInput'
            name="img"
            type="url"
            value={form.img}
            onChange={handleChange('img')}
          />
        </div>
        <div className="update-form-line">
          <label htmlFor="description">Description: </label>
          <input
            className='editInput'
            name="description"
            value={form.description}
            onChange={handleChange('description')}
          />
        </div>
        {product.tags.map((tag,idx) => {
            return(
              <div key={idx} className="category-form-line">
                <label htmlFor="categories">{`Category ${idx+1}`}</label>
                <div>
                  <select defaultValue={tag.name} className='tag-selector' onChange={(event) => changeTagHandler(tag.name, event.target.value)}>
                  {tags ? tags.map((tag,idx)=> <option key={idx}>{tag.name}</option>) : <></>}
                  </select>
                  {idx > 0 ? <button className='remove-tag' onClick={() => removeTagHandler(tag.name)}>X</button> : <></>}
                </div>
              </div>
            )
          })}
        <div className='category-form-line'>
            <label htmlFor='add-tag'>Add new category:</label>
            <select defaultValue='<select category>' id='tag-selector'  onChange={handleNewTagChange}>
              <option>{'<select category>'}</option>
              {tags ? tags.map((tag,idx)=> <option key={idx}>{tag.name}</option>) : <></>}
            </select>
          </div>
        <div className="button-form-line">
          <button className='admin-update-page-button' type="submit" disabled={checkDisabled()}>
            Update Product
          </button>
          <button className='admin-update-page-button' type="click" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </form>
      <Link className='back-to-all-admin-link' to="/adminportal/allproducts?page=1">Back to all products</Link>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ModifySingleProductAdminPage;
