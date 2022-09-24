import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import AccountPage from './components/AccountPage';
import AddNewProduct from './components/admin/AddNewProduct';
import AdminPortal from './components/admin/AdminPortal';
import AllProductsAdminView from './components/admin/AllProductsAdminView';
import AllUsersAdminView from './components/admin/AllUsersAdminView';
import ModifySingleProductAdminPage from './components/admin/ModifySingleProductAdminPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CreateAccount from './components/CreateAccount';
import EditAccountPage from './components/EditAccountPage';
import OrderHistory from './components/OrderHistory';
import SingleProduct from './components/SingleProduct';
// import "./App.css";
import SignIn from './components/SignIn';
import Userbar from './components/Userbar';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Category from './components/Category';
import { attemptTokenLogin } from './store/userSlice';
import './styling/Mainpage.css'
import OrderConfirmationPage from './components/OrderConfirmationPage';
import { attemptGetAllTags } from './store/productSlice';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(attemptTokenLogin());
    //loading tags here so only have to do once
    dispatch(attemptGetAllTags());
    const localCart = JSON.parse(window.localStorage.getItem('cart'));
    if (!localCart) {
      window.localStorage.setItem('cart',JSON.stringify({}))
    }
  }, [dispatch]);

  return (
    <div className="App">
      <header>
       < Header />
        <Userbar attemptTokenLogin={attemptTokenLogin} />
      </header>
      <Routes>
        <Route index element={<Welcome />} />
		    <Route path="/cart" element={<Cart/>}/>
        <Route path="/cart/checkout" element={<Checkout/>}/>
        <Route path="/cart/orderconfirmation" element={<OrderConfirmationPage/>}/>
		    <Route path="/singleproduct/:id" element={<SingleProduct />}/>
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/editinfo" element={<EditAccountPage />} />
        <Route path="/account/orderhistory" element={<OrderHistory />} />
        <Route path="/adminportal" element={<AdminPortal />} />
        <Route path="/adminportal/allusers" element={<AllUsersAdminView />} />
        <Route path="/adminportal/addproduct" element={<AddNewProduct />} />
        <Route path="/signin" element={<SignIn />} />
		<Route path="/:categories" element={<Category />} />
        <Route
          path="/adminportal/allproducts"
          element={<AllProductsAdminView />}
        />
        <Route
          path="/adminportal/modifyproduct/:id"
          element={<ModifySingleProductAdminPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
