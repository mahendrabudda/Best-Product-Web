import React from 'react'

import './Home.css'
import { assets } from '../../../frontend_assets/assets'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="background">
<video
    className="bg-video"
    src={assets.HomeVideo}
    autoPlay
    loop
    muted
    playsInline
  />
      <header className="navbar">
        <div className="nav-left">
          <img src={assets.logo} alt="Website Logo" className="logo" />
        </div>

        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
      </header>


      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <h1 className="hero-title">
          Compare Prices Across Multiple E-Commerce Platforms
        </h1>

        <p className="hero-description">
          Our platform helps you find the best price for any product by
          comparing offers from multiple online shopping websites in one place.
          Save time, save money, and make smarter purchase decisions.
        </p>

        <div className="hero-cta">
          <button className="primary-btn">
            Get Started
          </button>
        </div>


      </section>


     

     
    </div>
  )
}

export default Home
