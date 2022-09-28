import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/Mainpage.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
function Header() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  function handleOnChange(event) {
    setSearch(event.target.value);
  }
  function handleSeachSubmit(event) {
    if (event.key === 'Enter') {
      navigate(`/search/1?for=${search}`);
      setSearch('');
    }
  }
  return (
   <div className="header">
      <div className='headerLeft'>
          <Link  to="/" className='temp-link'>
               <img className='headerLogo' src ='https://downtownjacksonville.org/wp-content/uploads/2020/10/jackolanding-06.png'/>
         </Link>
         <div className='searchbar-div'>
            <div className="searchbar">
               <input className={user.id ? 'signedInSearch' :'searchBar'} placeholder='Search' onChange={(e) => handleOnChange(e)}
            onKeyPress={(e) => handleSeachSubmit(e)}
            value={search}/>
            </div>
            <SearchIcon className='search' fontSize='large' />
            </div>
         </div>

      <div className={user.id ? "headerRight" : 'headerright'}>
         <Link to="/cart" className='temp'>
            <ShoppingCartIcon className='carticon' fontSize='large' />
         </Link>
         {user.id ? <></> :
               <Link className='signIn' to='/signin'>
                  < AccountCircleIcon className='accounticon' fontSize='large'/>
                  <p className='loginLink'>Sign In</p>
               </Link>
            }
         </div>
      </div>
  );
}

export default Header;
