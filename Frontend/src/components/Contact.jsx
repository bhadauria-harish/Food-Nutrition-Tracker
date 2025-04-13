import React from 'react'
import { NavLink } from 'react-router-dom'
import './CSS/contact.css'


const Contact = () => {
  return (
    <>
    <div className="container">
    <section class="contact-info">
            <h2>Our Contact Information</h2>
            <div class="contact-details">
                <p><strong>Email : </strong> <NavLink to="mailto:foodnutritiontracker@gmail.com">foodnutritiontracker@gmail.com</NavLink></p>
                <p><strong>Phone : </strong> +123-456-7890</p>
                <p><strong>Address : </strong>Sone A Hostel NIT Patna, Ashok Rajpath, Patna, 800005</p>
            </div>

            <div className="social-links">
                <h2>Connect With Us</h2>
                <NavLink to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</NavLink>
                <NavLink to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</NavLink>
                <NavLink to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</NavLink>
              </div>
        </section>
    </div>
    </>
  )
}

export default Contact