import { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Section from '../../components/Section';
import { useForm } from "react-hook-form";
import Input from '../../components/Input'; // Make sure to import your Input componenty
import GoogleLoginButton from '../../components/GoogleLoginButton'; // Import your GoogleLoginButton component

import authService from '../../database/auth';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // Your login API call would go here
      // Your API call would go here
      const response = await authService.login({
        email: data.email,
        password: data.password
      });
      // console.log("User logged in: Login.jsx: ", response);
      // Redirect or show success message
      navigate(response.nextStep);

    } catch (error) {
      setSubmitError(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Keep your existing header section exactly as is */}
      <Section id="center" className="center_o">
        <Container> 
          <div className="row center_o1"> 
            <div className="col-md-12 text-center"> 
              <h1>Log<span className="col_4">in</span></h1> 
              <h5 className="normal col_1 mb-0"> 
                <Link to="/" className="col_2">
                  Home
                </Link>
                <span className="col_2">/</span> 
                <Link to="/pages" className="col_2">
                  Pages
                </Link>
                <span className="col_2">/</span> 
                Login
              </h5>
            </div>
          </div>
        </Container>
      </Section>

      {/* Enhanced form section */}
      <Section id="login"> 
        <Container> 
          <div className="row"> 
            <div className="col-md-12"> 
              <form onSubmit={handleSubmit(onSubmit)} className="login_1"> 
                <h3 className="col_1">Log<span className="col_4">in</span></h3> 
                <p>login with your Broker account</p>
                
                {/* Error message display */}
                {submitError && <div className="alert alert-danger">{submitError}</div>}

                {/* Email Input - using your Input component */}
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Your Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={errors.email}
                />

                {/* Password Input - using your Input component */}
                <Input
                  label="Password"
                  type="password"
                  placeholder="Your Password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  error={errors.password}
                />

                {/* Remember me & Forgot password */}
                <div className="d-flex justify-content-between mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                      {...register('remember')}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="col_1">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <h6 className="mt-4 mb-0"> 
                  <button 
                    type="submit" 
                    className="button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'LOGIN'}
                    <i style={{ marginLeft: '5px' }} className="fa fa-sign-in"></i>
                  </button>
                </h6>

                {/* Google Login Button */}
                <div className="text-center mt-4">
                  <GoogleLoginButton />
                </div>

                {/* Keep your existing register link */}
                <p className="mt-4 mb-0"> 
                  Don't have an account?{' '}
                  <Link to="/signup" className="col_1">
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default Login;