import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import {ImSearch} from "react-icons/im"
function Header() {
  return ( 
  <nav className='header'>
    <img src={logo} alt="" />
    <div>
      <Link to="/tvShow">Tv Show</Link>
      <Link to="/tvShow">Movies</Link>
      <Link to="/tvShow">Recently Added</Link>
      <Link to="/tvShow">My List</Link>
    </div>
    <ImSearch/>
  </nav>
  )
}

export default Header