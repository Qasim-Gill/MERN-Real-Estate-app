import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppLayout from './App.jsx'
import About from './pages/About/About.jsx'
import Agents from './pages/Agents/Agents.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import News from './pages/News/News.jsx'
import NewsDetail from './pages/NewsDetail/NewsDetail.jsx'
import PostNews from './pages/PostNews/PostNews.jsx'
import PostProperty from './pages/PostProperty/PostProperty.jsx'
import Property from './pages/Property/Property.jsx'
import PropertyDetail from './pages/PropertyDetail/PropertyDetail.jsx'
import Services from './pages/Services/Services.jsx'
import SignUp from './pages/SignUp/Signup.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NotFound from './pages/NotFound'
import Plans from './pages/Plans/Plans.jsx'
import SelectCategory from './pages/SelectCategory/SelectCategory.jsx';
import ConfirmPlanPayment from './pages/ConfirmPlanPayment/ConfirmPlanPayment.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from "react-redux";
import store from "./Redux/store.js"; // Import store
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess.jsx';
import PaymentCancelled from './pages/PaymentCancelled/PaymentCancelled.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassowrd.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: 'select-plan', element: <Plans /> },
      { path: 'select-category', element: <SelectCategory /> },
      { path: 'confirm-plan-payment/:planId', element: <ConfirmPlanPayment /> },
      { path: 'payment-success', element: <PaymentSuccess /> },
      { path: 'payment-cancelled', element: <PaymentCancelled /> },
      { path: 'home', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'properties', element: <Property /> },
      { path: 'property/:id', element: <PropertyDetail /> },
      { path: 'services', element: <Services /> },
      { path: 'agents', element: <Agents /> },
      { path: 'news', element: <News /> },
      { path: 'news/:id', element: <NewsDetail /> },
      { path: 'contact-us', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password/:token', element: <ResetPassword /> },
      { path: 'verify-email/:token', element: <VerifyEmail /> },

      // Protected routes - NEW STRUCTURE
      {
        path: 'post-property',
        element: (
          <ProtectedRoute>
            <PostProperty />
          </ProtectedRoute>
        ),
      },
      {
        path: 'post-property/:id',
        element: (
          <ProtectedRoute>
            <PostProperty />
          </ProtectedRoute>
        ),
      },
      {
        path: 'post-news',
        element: (
          <ProtectedRoute>
            <PostNews />
          </ProtectedRoute>
        ),
      },
      {
        path: 'post-news/:id',
        element: (
          <ProtectedRoute>
            <PostNews />
          </ProtectedRoute>
        ),
      },
      // 404 Not Found Route (IMPORTANT: keep it LAST inside children)
      { path: '*', element: <NotFound /> }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
// json-server --watch db.json --port 5000
// json-server --watch react-blog-local-api/db.json --port 5000
// use upper line to run json-server in the terminal
// and then use the following line to run the React app
// npm run dev