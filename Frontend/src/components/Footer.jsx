import React from 'react'
import './CSS/footer.css'
import { NavLink } from 'react-router-dom'


const Footer = () => {
  return (
    <>
    <footer class="footer">
    <div class="footer-container">
        <div class="footer-section">
            <h4>About Us</h4>
            <p>At Food Nutrition Tracker , our mission is to empower you to make informed food choices effortlessly.</p>
            <NavLink href="/about">Learn More</NavLink>
        </div>
        <div class="footer-section">
            <h4>Services</h4>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/teamInfo">Team Info</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li><NavLink to="/help">Help</NavLink></li>
            </ul>
        </div>
        <div class="footer-section socials">
        <h4>Follow Us</h4>
        <div className="icons">
        <NavLink to="https://www.facebook.com/"><i class="ri-facebook-box-fill"></i></NavLink>
        <NavLink to="www.linkedin.com"><i class="ri-linkedin-box-fill"></i></NavLink>
        <NavLink to="www.instagram.com"><i class="ri-instagram-fill"></i></NavLink>
        </div>
    </div>
        <div class="footer-section">
            <h4>Contact</h4>
            <p>Email: info@example.com</p>
            <p>Phone: +123456789</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2025 Food Nutrition Tracker. All rights reserved.</p>
    </div>
</footer>
    </>
  )
}

export default Footer
