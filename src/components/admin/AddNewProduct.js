import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { attemptCreateNewProduct } from "../../store/productSlice";

const AddNewProduct = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        price: '',
        inventory: '',
        img: '',
        description: ''
    })

    React.useEffect(() => {
        if (!user.isAdmin) {
            navigate('/')
        }
    },[])

    const handleChange = props => event => {
        setForm({
          ...form,
          [props]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let product = {...form};
        product.price = Number(product.price)
        product.inventory = Number(product.inventory)
        dispatch(attemptCreateNewProduct(product,user))
        // if product successfully completed, may want to navigate to single product view page or something
    }
    
    const checkDisabled = () => {
        return (
            !form.name.length ||
            !form.price.length ||
            !form.inventory.length 
        )
    }

    return(
        <div id="new-product-form-container">
            <form id="new-product-form" onSubmit={handleSubmit}>
                <h2>New Product Form</h2>
                <div className="form-line">
                    <label htmlFor="name">Name: </label>
                    <input name="name" value={form.name} onChange={handleChange('name')}/>
                </div>
                <div className="form-line">
                    <label htmlFor="price">Price: </label>
                    <input name="price" type="number" value={form.price} onChange={handleChange('price')}/>
                </div>
                <div className="form-line">
                    <label htmlFor="inventory">Inventory: </label>
                    <input name="inventory" type="number" value={form.inventory} onChange={handleChange('inventory')}/>
                </div>
                <div className="form-line">
                    <label htmlFor="img">Image Link: </label>
                    <input name="img" type="url" value={form.img} onChange={handleChange('img')}/>
                </div>
                <div className="form-line">
                    <label htmlFor="description">Description: </label>
                    <input name="description" value={form.description} onChange={handleChange('description')}/>
                </div>
                <button type="submit" disabled={checkDisabled()}>Create Product</button>
            </form>
        </div>
    )
}

export default AddNewProduct;