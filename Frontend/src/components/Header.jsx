import React from 'react'
import { NavLink } from 'react-router-dom'
import './CSS/header.css'

const Header = () => {
  return (
    <>
    <nav>
    <div className="logo">
        Food Nutrition Tracker
      </div>
      <div className="menus">
        <NavLink className="anchors" to="/">Home</NavLink>
        <NavLink className="anchors" to="/about">About</NavLink>
        <NavLink className="anchors" to="/teaminfo">Team Info</NavLink>
        <NavLink className="anchors" to="/contact">Contact</NavLink>
        <NavLink to="/help"><button>Help</button></NavLink>
      </div>
    </nav>
    </>
  )
}

export default Header