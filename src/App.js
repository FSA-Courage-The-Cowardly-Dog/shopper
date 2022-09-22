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
import CreateAccount from './components/CreateAccount';
import EditAccountPage from './components/EditAccountPage';
import OrderHistory from './components/OrderHistory';
// import "./App.css";
import Userbar from './components/Userbar';
import Welcome from './components/Welcome';
import { attemptTokenLogin } from './store/userSlice';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(attemptTokenLogin());
	const localCart = JSON.parse(window.localStorage.getItem('cart'));
	if (!localCart) {
		window.localStorage.setItem('cart',JSON.stringify({}))
	}
  }, [dispatch]);

  return (
    <div className="App">
      <header>
		<Link to="/" className='temp-link'>Home</Link>
		<Link to="/cart" className='temp-link'>Cart</Link>
        <Userbar attemptTokenLogin={attemptTokenLogin} />
      </header>
      <Routes>
        <Route index element={<Welcome />} />
		<Route path="/cart" element={<Cart/>}/>
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/editinfo" element={<EditAccountPage />} />
        <Route path="/account/orderhistory" element={<OrderHistory />} />
        <Route path="/adminportal" element={<AdminPortal />} />
        <Route path="/adminportal/allusers" element={<AllUsersAdminView />} />
        <Route path="/adminportal/addproduct" element={<AddNewProduct />} />
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
