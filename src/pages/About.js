import React from 'react'
import Layout from '../components/Layout/Layout'
import './About.css'
function About() {
  return (
    <Layout>
      <div className="about-container">
        <div className="about-image">
          <img src="/images/About_Us.png" alt="About Us" />
        </div>
        <div className="about-text">
          <h2>
            ABOUT <span>US</span>
          </h2>
          <p>
            <strong>Faishon Ecommerce</strong> is your go-to destination for premium fashion that speaks elegance,
            confidence, and modern style. We believe in celebrating every body type through bold
            and beautiful silhouettes—especially our signature <strong>bodycon dresses</strong> designed to turn heads.
          </p>
          <p>
            Our curated collections reflect the latest trends while maintaining timeless quality.
            Whether you're dressing up for a party or owning your everyday look, <strong>Faishon Ecommerce</strong> ensures
            you're always fashion-forward with comfort and flair.
          </p>
          <h5><strong>Our Mission</strong></h5>
          <p>
            At <strong>Faishon Ecommerce</strong>, our mission is to empower individuals through style. We aim to offer easy
            access to high-quality, trendsetting apparel that makes you feel confident in your own
            skin—especially with our standout bodycon range.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
