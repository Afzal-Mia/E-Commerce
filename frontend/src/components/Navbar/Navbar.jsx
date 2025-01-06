import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../assets/nav_dropdown.png'

function Navbar() {
    const [menu, setMenu] = useState('shop');
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();
    function dropdown_toggle(e) {
        menuRef.current.classList.toggle('nav-menu-visible');//Note here menuRef.current return an element (ul)
        e.target.classList.toggle('open');
    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="Logo" />
                <p>CLOTHES</p>
            </div>
            <img onClick={dropdown_toggle} src={nav_dropdown} className='nav-dropdown'alt='togle' />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }} ><Link to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }} ><Link to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }} ><Link to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>LogOut</button>:<Link to='/login'><button>Login</button></Link>}
                
                <Link to='/cart'><img src={cart_icon} alt="cart_icon" /></Link>{/*onClick={()=>{setMenu("shop")}} */}
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;