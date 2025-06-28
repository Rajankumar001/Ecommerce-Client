import React from "react";
import Layout from "../components/Layout/Layout";
import "./Contact.css";

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <div className="contact-container">
        <div className="contact-box">
          <div className="contact-image">
            <img src="/images/Contact.jpg" alt="Contact Us" />
          </div>
          <div className="contact-form">
            <h3>Get in Touch</h3>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows="5" />
            <button type="submit">Submit</button>
          </div>
        </div>

        <div className="subscribe-section">
          <p className="mini-title">Join the Clothzy Style Community</p>
          <h3>Subscribe now & get 20% off</h3>
          <p>Clothzy Fashion – Where Style Meets Confidence.</p>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>SUBSCRIBE</button>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-left">
            <h6>FAISHON <span>ECOMMERCE</span></h6>
            <p>
              Clothzy Fashion brings bold elegance to your wardrobe. From bodycon dresses to chic essentials, 
              we redefine style. Perfect fits, premium fabrics — confidence in every thread.
            </p>
          </div>
          <div className="footer-links">
            <h5>COMPANY</h5>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h5>GET IN TOUCH</h5>
            <p><strong>Phone:</strong> 7676767676</p>
            <p><strong>Email:</strong> contact@FaishonEcommerce.in</p>
            <p><strong>Address:</strong> A-6, Amar colony, Delhi - 110041</p>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Contact;
