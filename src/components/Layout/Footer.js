import React from 'react';
import { FaCcPaypal } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";
import './Footer.css';
function Footer() {
  return (
    <div className="fashion-website">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image">
          <img 
            src="/images/footer_background.png"
            className="hero-img"
            alt='footer'
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* Shop Column */}
            <div className="footer-column">
              <h3 className="footer-title">SHOP</h3>
              <ul className="footer-links">
                <li><a href="#new">New Arrivals</a></li>
                <li><a href="#collections">Collections</a></li>
                <li><a href="#accessories">Accessories</a></li>
                <li><a href="#shoes">Shoes</a></li>
                <li><a href="#inspiration">Inspiration</a></li>
                <li><a href="#brands">Brands</a></li>
                <li><a href="#gift-cards">Gift Cards</a></li>
              </ul>
            </div>

            {/* Popular Column */}
            <div className="footer-column">
              <h3 className="footer-title">POPULAR</h3>
              <ul className="footer-links">
                <li><a href="#seasonal">Seasonal Favorites</a></li>
                <li><a href="#must-have">Must Have Bags</a></li>
                <li><a href="#cozy">Cozy Knitwear</a></li>
                <li><a href="#trendy">Trendy Accessories</a></li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="footer-column">
              <h3 className="footer-title">SUPPORT</h3>
              <ul className="footer-links">
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/account">Account</a></li>
                <li><a href="/locations">Store Locations</a></li>
                <li><a href="/#">Shipping And Delivery</a></li>
                <li><a href="/returns">Returns</a></li>
              </ul>
            </div>

            {/* Info Column */}
            <div className="footer-column">
              <h3 className="footer-title">INFO</h3>
              <ul className="footer-links">
                <li><a href="/about">About</a></li>
                <li><a href="/career">Career</a></li>

              </ul>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-section">
            <div className="payment-methods">
              <div className="payment-icon visa"><FaCcVisa size={30}/></div>
              <div className="payment-icon google-pay"><FaGooglePay size={30}/></div>
              <div className="payment-icon mastercard"><FaCcPaypal size={30}/></div>
              <div className="payment-icon paypal"><FaCcMastercard size={30}/></div>
            </div>
            
            {/* Social Media Icons */}
            <div className="social-media">
              <a href="#facebook" className="social-icon">f</a>
              <a href="#instagram" className="social-icon">📷</a>
              <a href="#pinterest" className="social-icon">P</a>
              <a href="#tiktok" className="social-icon">♪</a>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="footer-bottom">
            <div className="footer-legal">
              <span className="copyright">© 2025 Faishon Ecommerce</span>
              <div className="legal-links">
                <a href="/cookies">Cookies</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms and Conditions</a>
                <a href="/sitemap">Sitemap</a>
              </div>
            </div>
            <div className="country-selector">
              <span>Denmark</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
