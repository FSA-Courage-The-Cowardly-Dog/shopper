import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { attemptGetSingleProduct, attemptUnmountSingleProduct, attemptUpdateProduct } from "../../store/productSlice";

const ModifySingleProductAdminPage = () => {
    const user = useSelector(state => state.user)
    const product = useSelector(state => state.product.singleProduct)
    const [form, setForm] = useState({
        name: '',
        price: '',
        inventory: '',
        img: '',
        description: ''
    })
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    React.useEffect(() => {
        async function loadProduct() {
            await dispatch(attemptGetSingleProduct(params.id))
            setIsLoaded(true);
        }
        loadProduct()
        return () => {
            dispatch(attemptUnmountSingleProduct())
        }
    },[])

    React.useEffect(() => {
        if (!user.isAdmin) {
            navigate('/')
        }
        if (isLoaded) {
            setForm(product)
        }
    },[isLoaded])

    const handleChange = props => event => {
        setForm({
          ...form,
          [props]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // form currently includes id, createdAt, updatedAt; want to prune those
        let productDetails = {
            name: form.name,
            price: Number(form.price),
            inventory: Number(form.inventory),
            img: form.img,
            description: form.description
        }
        dispatch(attemptUpdateProduct(productDetails,params.id, user))
        // can either navigate back to allproducts, or display a message that product has been updated
    }

    const checkDisabled = () => {
        return (
            !form.name.length ||
            !form.price.toString().length ||
            !form.inventory.toString().length 
        )
    }

    return( form ?
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
                <div className="form-line">
                    <label htmlFor="categories">Categories: </label>
                    {/* <input name="categories" value={form.categories} onChange={handleChange('categories')}/> */}
                    <div>Placeholder for adding tag</div>
                </div>
                <button type="submit" disabled={checkDisabled()}>Update Product</button>
            </form>
            <Link to="/adminportal/allproducts">Back to all products</Link>
        </div>
        : <></>
    )
}

export default ModifySingleProductAdminPage