import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { attemptGetProductList } from "../../store/productSlice";

const AllProductsAdminView = () => {
    const user = useSelector(state => state.user)
    const products = useSelector(state => state.product.productList)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!user.isAdmin) {
            navigate('/')
        }
        dispatch(attemptGetProductList())
    },[])

    // want to add pagination functionality
    return( products ?
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
                    {products.map((product,idx) => {
                        return(
                            <tr key={idx}>
                                <td><Link to={`/adminportal/modifyproduct/${product.id}`}>{product.id}</Link></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.inventory}</td>
                                <td className="product-imgUrl">{product.img}</td>
                                <td className="product-desc">{product.description}</td>
                                <td>(Placeholder)</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Link to="/adminportal">Back to portal</Link>
        </div>
        : <></>
    )
}

export default AllProductsAdminView;