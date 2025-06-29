import { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/Container';
import Section from '../../components/Section';
import { useForm } from "react-hook-form";
import Input from '../../components/Input';
import GoogleLoginButton from '../../components/GoogleLoginButton'; // Import your GoogleLoginButton component

import authService from '../../database/auth';

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    // console.log(data);
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // Your API call would go here
      const response = await authService.createAccount({
        email: data.email,
        password: data.password,
        fullname: data.fullname,
        image: data.image[0] // Assuming image is a FileList
      });
      console.log("User registered successfully in Signup.jsx:", response);
      // Redirect or show success message
      navigate(`/${response?.nextStep}`);

    } catch (error) {
      // console.error("Registration error:", error);
      setSubmitError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch password field for confirmation validation
  // watch() is only needed when one field depends on another.
  // watch() triggers re-renders when the watched field changes.
  // When Would You Use watch() for Other Fields?
  // You’d only need it if:
  // A field depends on another field (e.g., "City" dropdown updating based on "Country" selection).
  // You need live updates (e.g., a password strength meter).
  const password = watch("password");
  const passwordStrength = password?.length > 10 ? "Strong" : password?.length > 6 ? "Medium" : "Weak";
  // Other Fields Don't Need Cross-Validation
  // Fields like email or fullname don’t depend on another field’s value.
  // They only need standalone validation (e.g., "Is this a valid email?").

  return (
    <>
      <Section id="center" className="center_o">
        <Container>
          <div className="row center_o1">
            <div className="col-md-12 text-center">
              <h1>Regis<span className="col_4">ter</span></h1>
              <h5 className="normal col_1 mb-0">
                <Link to="/" className="col_2">Home</Link>
                <span className="col_2">/</span>
                <Link to="/pages" className="col_2">Pages</Link>
                <span className="col_2">/</span>
                Register
              </h5>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="login">
        <Container>
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={handleSubmit(onSubmit)} className="login_1">
                <h3 className="col_1">Regis<span className="col_4">ter</span></h3>
                <p>create your Estate Brok account</p>
                {/* Display submission errors */}
                {submitError && <div className="alert alert-danger">{submitError}</div>}
                {/* one lesson i learned is if required is bool type eg required: true then it will not show any error message */}
                {/* but if you give string it will give error message if user doesn't enter input */}
                <Input
                  autoFocus
                  label="Full Name"
                  type="text"
                  placeholder="Your Name"
                  {...register('fullname', {
                    required: 'Full name is required',
                    minLength: {
                      value: 3,
                      message: 'Full name must be at least 3 characters',
                    },
                  })}
                  error={errors.fullname}
                />

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

                <Input
                  label="Password"
                  type="password"
                  placeholder="Your Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  error={errors.password}
                />
                {password && (
                  <span className={`small ${passwordStrength === "Strong" ? "text-success" : "text-warning"}`}>
                    Strength: {passwordStrength}
                  </span>
                )}

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                  error={errors.confirmPassword}
                />

                {/* Profile Photo Field */}
                <Input
                  label="Upload Profile Photo"
                  type="file"
                  {...register('image', {
                    required: 'Image is required',
                    validate: {
                      fileSize: (files) => {
                        const file = files[0];
                        if (file && file.size > 2 * 1024 * 1024) { // 2MB limit
                          return 'Image size must be less than 2MB';
                        }
                        return true;
                      },
                      fileType: (files) => {
                        const file = files[0];
                        if (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                          return 'Only JPEG, PNG, and GIF formats are allowed';
                        }
                        return true;
                      },
                    },
                  })}
                  error={errors.image}
                />

                <div className="d-flex justify-content-between mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      {...register('terms', {
                        required: 'You must accept the terms',
                      })}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree with the{' '}
                      <Link to="/terms" className="col_1">
                        Terms Of Service
                      </Link>
                    </label>
                    {errors.terms && (
                      <p className="text-danger small mt-1">{errors.terms.message}</p>
                    )}
                  </div>
                </div>

                <h6 className="mt-4 mb-0">
                  <button type="submit" className="button" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'REGISTER'} <i style={{ marginLeft: '5px' }} className="fa fa-location-arrow"></i>
                  </button>
                </h6>

                {/* Google Login Button */}
                <div className="text-center mt-4">
                  <GoogleLoginButton />
                </div>

                <p className="mt-4 mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="col_1">
                    Login
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

export default Signup;




// import authService from '../../brilliantDirectories/auth';

// Login
// const loggedInUser = await authService.login({
//     email: 'user@example.com',
//     password: 'securepass123'
// });

// Get current user
// const currentUser = authService.getCurrentUser();

// Logout
// authService.logout();