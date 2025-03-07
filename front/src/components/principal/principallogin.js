import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import validator from 'validator';
import { regexPassword } from '../../utils';
import {baseurl} from '../../url';
import '../Login.css';

function AdminLogin() {
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    fetchError: false,
    fetchErrorMsg: '',
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value;
    const isCorrectValue =
      fieldName === 'email'
        ? validator.isEmail(currValue)
        : regexPassword.test(currValue);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: !isCorrectValue,
    }));

    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: currValue,
    }));
  };

  const handleShowPassword = () => {
    setValues((prevValues) => ({
      ...prevValues,
      showPassword: !prevValues.showPassword,
    }));
  };

  const handleForgotPassword = () => {
    navigate('/pforgot');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${baseurl}/api/principallogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            post:'Principal'
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        if (!isMounted.current) return;
        return setErrors((prevErrors) => ({
          ...prevErrors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        }));
      }

      const data = await res.json();

      if (data) {
        // Redirect the officer to the office page
       
        localStorage.setItem('role', data.role);
        localStorage.setItem('branch', data.department);
        localStorage.setItem('email', data.email);
      
        if (!isMounted.current) return;
        navigate('/phome');
      } else {
        if (!isMounted.current) return;
        alert('Login failed.');
        window.location.href = '/principallogin';
      }

      if (isMounted.current) {
        setValues({
          email: '',
          password: '',
          showPassword: false,
        });
      }
    } catch (error) {
      if (!isMounted.current) return;
      setErrors((prevErrors) => ({
        ...prevErrors,
        fetchError: true,
        fetchErrorMsg:
          'There was a problem with our server, please try again later',
      }));
    }
  };

  return (
    <div className="login-background-image">
      <div className="login-container">
        <div className="login-form">
          <div className="login-header-box">
            <div className="login-header">
              <div className="login-avatar">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon.png`}
                  alt="Avatar"
                  style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                />
              </div>
              <h2>Login</h2>
            </div>
          </div>
          <form className="login-fill" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange('email')}
              className={errors.email ? 'login-error' : ''}
            />
            {errors.email && (
              <p className="login-error-text">Please insert a valid email address</p>
            )}

            <div className="login-password-field">
              <div className="password-input-container">
                <input
                  type={values.showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange('password')}
                  className={errors.password ? 'login-error' : ''}
                />
              </div>
            </div>
            <div className="forgot-show-password-links">
              <span className="show-password-link" onClick={handleShowPassword}>
                {values.showPassword ? 'Hide' : 'Show'} Password
              </span>
              <a href="/pforgot" onClick={handleForgotPassword} className="forgot-password-link">
                Forgot Password?
              </a>
            </div>
            <div className="login-button-container">
              <button type="submit" disabled={errors.email || errors.password}>
                Login
              </button>
            </div>
            <div className="signup-link">
              <p>
                Not yet registered? <Link to="/principalsignup">Sign up</Link>
              </p>
            </div>
            {errors.fetchError && <p className="login-error-text">{errors.fetchErrorMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
