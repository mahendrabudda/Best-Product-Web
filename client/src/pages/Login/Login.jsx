import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={`login-page ${active ? "active" : ""}`}>
      <div className="container">

        {/* ================= SIGN UP ================= */}
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>

            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>

            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>

        {/* ================= SIGN IN ================= */}
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>

            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>

            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>

        {/* ================= TOGGLE ================= */}
        <div className="toggle-container">
          <div className="toggle">

            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Login to continue comparing prices smarter</p>
              <button className="hidden" onClick={() => setActive(false)}>
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Create an account and never overpay again</p>
              <button className="hidden" onClick={() => setActive(true)}>
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
