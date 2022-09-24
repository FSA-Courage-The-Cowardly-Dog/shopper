import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  attemptDeleteProduct,
  attemptGetSingleProduct,
  attemptUnmountSingleProduct,
  attemptUpdateProduct,
} from '../../store/productSlice';

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
      await dispatch(attemptGetSingleProduct(params.id));
      setIsLoaded(true);
    }
    loadProduct();
    return () => {
      dispatch(attemptUnmountSingleProduct());
    };
  }, []);

  React.useEffect(() => {
    if (!user.isAdmin) {
      navigate('/');
    }
    if (isLoaded) {
      setForm(product);
    }
  }, [isLoaded]);

  const handleNewTagChange = (event) => {
    event.target.value === '<select category>' ? setNewTag('') : setNewTag(event.target.value);
  }

  const handleChange = (props) => (event) => {
    setForm({
      ...form,
      [props]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // form currently includes id, createdAt, updatedAt; want to prune those
    let productDetails = {
      name: form.name,
      price: Number(form.price),
      inventory: Number(form.inventory),
      img: form.img,
      description: form.description,
    };
    dispatch(attemptUpdateProduct(productDetails, params.id, newTag));
    // can either navigate back to allproducts, or display a message that product has been updated
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
    // dispatch method to attemptRemoveTag
  }

  const handleDelete = () => {
    dispatch(attemptDeleteProduct(params.id));
    navigate('/adminportal/allproducts');
  };

  return product.name ? (
    <div id="new-product-form-container">
      <form id="new-product-form" onSubmit={handleSubmit}>
        <h2>Update Product Form</h2>
        <div className="form-line">
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange('name')}
          />
        </div>
        <div className="form-line">
          <label htmlFor="price">Price: </label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange('price')}
          />
        </div>
        <div className="form-line">
          <label htmlFor="inventory">Inventory: </label>
          <input
            name="inventory"
            type="number"
            value={form.inventory}
            onChange={handleChange('inventory')}
          />
        </div>
        <div className="form-line">
          <label htmlFor="img">Image Link: </label>
          <input
            name="img"
            type="url"
            value={form.img}
            onChange={handleChange('img')}
          />
        </div>
        <div className="form-line">
          <label htmlFor="description">Description: </label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange('description')}
          />
        </div>
        <div className="form-line">
          <label htmlFor="categories">Categories: </label>
          <div>Name:</div>
        </div>
        {product.tags.map((tag,idx) => {
            return(
              <div key={idx} className="form-line">
                <label htmlFor="categories">{`Category ${idx+1}`}</label>
                <div>
                  <select defaultValue={tag.name} className='tag-selector'>
                  {tags ? tags.map((tag,idx)=> <option key={idx}>{tag.name}</option>) : <></>}
                  </select>
                  {/* add remove tag handle method; write remove tag thunk */}
                  {idx > 0 ? <button className='remove-tag' onClick={() => removeTagHandler(tag.name)}>X</button> : <></>}
                </div>
              </div>
            )
          })}
        <div className='form-line'>
            <label htmlFor='add-tag'>Add category:</label>
            <select defaultValue='<select category>' id='tag-selector'  onChange={handleNewTagChange}>
              <option>{'<select category>'}</option>
              {tags ? tags.map((tag,idx)=> <option key={idx}>{tag.name}</option>) : <></>}
            </select>
          </div>
        {/* work on changing tags; then work on deleting tags */}
        <div className="form-line">
          <button type="submit" disabled={checkDisabled()}>
            Update Product
          </button>
          <button type="click" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </form>
      <Link to="/adminportal/allproducts">Back to all products</Link>
    </div>
  ) : (
    <></>
  );
};

export default ModifySingleProductAdminPage;
