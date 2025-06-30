# 🚀 MERN Stack Full-Stack App with Stripe, Cloudinary, and Material UI

This is a production-ready full-stack project built using the **MERN stack** (MongoDB, Express, React, Node.js), featuring modern tools like **Stripe**, **Cloudinary**, **Redux**, **Nodemailer**, **JWT**, and **Material UI**. It’s designed with scalability, security, and real-world application structure in mind.

## 🔧 Tech Stack

**Frontend:**
- React (SPA)
- Redux Toolkit
- React Hook Form
- Material UI (MUI)
- Cloudinary (for image uploads)
- Stripe (for payments)

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Google OAuth
- Nodemailer (email verification & password reset)
- RESTful APIs

## 🎯 Key Features

### ✅ **Frontend Highlights**
- SPA with active navigation highlighting
- Responsive design (MUI Grid + Flexbox)
- Form validation using react-hook-form
- Stripe integration for membership plans
- Email verification and password reset via email
- Image uploads using Cloudinary
- Membership-based posting/commenting limits
- Interactive features:
  - Like / Dislike
  - Follow / Unfollow
  - Conditional commenting
  - Feature post highlights
- Advanced filtering & search
- 404 Not Found page

### ⚙️ **Backend Highlights**
- RESTful APIs for users, posts, and comments
- Auth with JWT + Google OAuth
- Secure password hashing (bcrypt)
- Email services (verification + reset) via Nodemailer
- Role-based access control (based on plan)
- File handling via Cloudinary
- Clean project structure (routes, controllers, middlewares)

## 📦 Folder Structure

mern-project/
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ └── ...
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── middlewares/


## 💳 Membership & Payment Flow

1. User selects a plan (e.g. Basic, Premium)
2. Stripe Checkout handles secure payment
3. User gets access to specific features based on plan:
   - Post limits
   - Ability to comment or feature posts
   - Access to follow/like features

## 📧 Auth & Email Features

- Email signup with verification
- Google OAuth login
- Forgot password → email token → reset
- JWT stateless auth with protected routes

## 🖼️ Image Uploads with Cloudinary

- Uploads handled via frontend form
- Images stored securely on Cloudinary
- URLs saved to MongoDB

## 🧪 API Highlights

- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/users/google-auth`
- `GET /api/posts/:id`
- `POST /api/posts/` (author-only)
- `POST /api/comments/:postId`
- Protected via middleware and role-based access

## 🌐 Live Demo

Currently not hosted — watch the [📽️ video demo](https://youtu.be/A-sKXRlz_ew) instead  
Here is Slides Link [Slides Link](https://www.canva.com/design/DAGrvig5ZcI/CgLGmSprvfUFy5Xaf7ysNg/edit?utm_content=DAGrvig5ZcI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## 📂 Getting Started

```bash
# Backend http://localhost:8000/
cd backend
npm install
npm run dev


# Frontend http://localhost:5173/
cd frontend
npm install
npm start
Add .env files for your MongoDB, Cloudinary, JWT, Stripe, etc.
```

## 🙋‍♂️ Author

**Muhammad Qasim**  
🧑‍💻 Passionate Full-Stack Developer  

🔗 [LinkedIn](https://www.linkedin.com/in/muhammad-qasim-gill/)  

---

## 🖼️ App Screenshots

### 💳 Payment & Membership

![Stripe Payment Page](https://github.com/user-attachments/assets/d1663c55-aa27-4b0b-b0bf-542b045615d1)
![Payment Confirmation Page](https://github.com/user-attachments/assets/99042966-50cf-433f-b9bf-bf858b449627)
![Payment Confirmed](https://github.com/user-attachments/assets/a01e49e9-34b4-4af1-91fb-a14e1fe4d081)
![Membership Plans](https://github.com/user-attachments/assets/58eed575-5604-46ee-a15c-f43177251569)

---

### 🏡 Property & Member Search

![Home Page](https://github.com/user-attachments/assets/b39a6b5e-478e-4dcf-9249-7cb46cd6d5ed)
![Property Search Results](https://github.com/user-attachments/assets/479946ca-25b9-40eb-87cf-468488e2d09c)
![Member Search Results](https://github.com/user-attachments/assets/1d3dfc74-0f31-4a85-98dd-9d61167c660c)

---

### ✍️ Posting & Forms

![Post Property Form](https://github.com/user-attachments/assets/f1033ae2-1c3e-4e3f-a48a-49b219eedc17)
![Navbar](https://github.com/user-attachments/assets/8fa1e7ff-a6f4-4b5a-8ae9-c6139509ea5f)

---

### 🔐 Auth Screens

![Login Page](https://github.com/user-attachments/assets/de9a65e3-fd74-4545-be2c-2e3d558202e6)
![Signup Form](https://github.com/user-attachments/assets/63f11929-a77b-4ae5-ba93-423616afb586)


