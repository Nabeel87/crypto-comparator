import React from 'react'

import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className="navbar">
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} >
                    Home
                </NavLink>
                <NavLink to="/compare" className={({ isActive }) => isActive ? 'active' : ''} >
                    Compare
                </NavLink>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''} >
                    Favorites
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar