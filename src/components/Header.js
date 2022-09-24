import React from 'react'
import { Link } from 'react-router-dom'
import '../styling/Mainpage.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  return (
    <div className='header'>
        <Link  to="/" className='temp-link'>

             <img className='headerLogo' src ='https://downtownjacksonville.org/wp-content/uploads/2020/10/jackolanding-06.png'/>
             
        </Link>

        <div className="searchbar">
            <input className='searchBar' placeholder='Search' />
         </div>

         <SearchIcon className='search' fontSize='large' />

         <Link to="/cart" className='temp'>
            <ShoppingCartIcon className='carticon' fontSize='large' />
         </Link>

    </div>
  )
}

export default Header