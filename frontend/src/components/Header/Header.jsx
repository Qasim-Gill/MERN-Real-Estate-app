// Description: Header component for the website, includes navigation links and user authentication status.
// When user logged in show profile image, name, and logout button.
// When user not logged in show login and register links.
import { AppProvider } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import { createTheme } from '@mui/material/styles';

// Force light mode because when user logged in i used material ui for display loggin in user image, name, email and logout button
// by default AppProvider uses dark theme so this function is from Material ui and i inject it in below now it is ok
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
// for logout user
import { useDispatch } from 'react-redux'
import authService from '../../database/auth'
import { logout } from '../../Redux/authSlice'

import Container from '../Container';
import Section from '../Section'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';

import { useState, useEffect, useMemo } from 'react';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  // console.log("User Data in Header.jsx: ", userData);
  // userData is an object that contains user information
  // Example userData structure:
  // {
  //   "id": "6857d00ff32cd7b0be16b8f0",
  //   "fullname": "User",
  //   "email": "hashimprince407@gmail.com",
  //   "category": "Buyer",
  //   "image": "https://res.cloudinary.com/dhmnncaxa/image/upload/v1750585359/user_profiles/oonpq2mbzt7moltzyxm9.jpg",
  //   "plan": "68456ac477e9e445b87d12bb"
  // }
  // console.log("Auth Status in Header.jsx: ", authStatus);
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (authStatus && userData) {
      setSession({
        user: {
          name: userData.fullname,
          email: userData.email,
          image: userData.image.url,
        },
      });
    } else {
      setSession(null);
    }
  }, [authStatus, userData]);

  const authentication = useMemo(() => ({
    signIn: () => setSession({
      user: {
        name: userData.fullname,
        email: userData.email,
        image: userData.image.url,
      },
    }),
    signOut: () => {
      setSession(null);
      // redirect or dispatch logout if needed
      logoutHandler();
    },
  }), [userData]);
  const navigate = useNavigate()
  // console.log("Session in Header.jsx: ", session);
  return (
    <>
      <Section id="top">
        <Container>
          <div className="row top_1">
            <div className="col-md-5">
              <div className="top_1l">
                <ul className="mb-0">
                  <li style={{ marginRight: '10px' }} className="d-inline-block col_light">Follow Us :</li>
                  <li style={{ marginRight: '10px' }} className="d-inline-block"><a className="text-white" href="#"><i className="fa fa-facebook"></i></a></li>
                  <li style={{ marginRight: '10px' }} className="d-inline-block"><a className="text-white" href="#"><i className="fa fa-instagram"></i></a></li>
                  <li style={{ marginRight: '10px' }} className="d-inline-block"><a className="text-white" href="#"><i className="fa fa-twitter"></i></a></li>
                  <li className="d-inline-block"><Link className="text-white" to="#"><i className="fa fa-vimeo"></i></Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-7">
              <div className="top_1r float-end">
                <ul className="mb-0">
                  <li style={{ marginRight: '10px' }} className="d-inline-block">
                    <a className="text-white" href="#">
                      <i className="fa fa-phone col_light me-1"></i> +123 456 789
                    </a>
                  </li>
                  {!authStatus && (
                    <>
                      <li style={{ marginRight: '10px' }} className="d-inline-block">
                        <NavLink className="text-white" to="/login"> Login </NavLink>
                      </li>
                      <li style={{ marginRight: '10px' }} className="d-inline-block">
                        <NavLink className="text-white" to="/signup"> Register </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="header">
        <nav className="navbar navbar-expand-md navbar-light bg-white" id="navbar_sticky">
          <Container>
            <NavLink className="navbar-brand col_1" to="/"><i className="fa fa-home col_1"></i> Gill <span className="col_4">Estates</span></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mb-0 ms-auto">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    to="/about"
                  >
                    About Us
                  </NavLink>
                </li>
                {!authStatus && (
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    to="/properties"
                  >
                    Properties
                  </NavLink>
                )}
                {authStatus && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Property
                    </a>
                    <ul className="dropdown-menu drop_1" aria-labelledby="navbarDropdown">
                      <li><NavLink style={{ borderBottom: '1px solid #ddd' }} className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`} to="/properties">Properties</NavLink></li>
                      <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`} to="/post-property">Post Property</NavLink></li>
                    </ul>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    to="/services"
                  >
                    Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    to="/agents"
                  >
                    Agent
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    to="/news"
                  >
                    News
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    to="/contact-us"
                  >
                    Contact Us
                  </NavLink>
                </li>

                {/* if user logged in then show this pages div else show logout button */}
                {authStatus && false && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}

                {authStatus && session && (
                  <li className="nav-item">
                    <AppProvider authentication={authentication} session={session} theme={lightTheme}>
                      <Account />
                    </AppProvider>
                  </li>
                )}

              </ul>
            </div>
          </Container>
        </nav>
      </Section>
    </>
  );
}

export default Header;