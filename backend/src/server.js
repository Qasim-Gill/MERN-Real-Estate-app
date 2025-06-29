import './config.js'; // This will load the environment variables from a .env file into process.env
import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js'; // .js extension is required in ESM
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';
// Importing auth routes for password reset functionality
import authRoutes from './routes/authRoutes.js';
// Importing Comment routes
import commentRoutes from './routes/commentRoutes.js';
// Importing controllers and middlewares for user registration
import userRoutes from './routes/userRoutes.js';
// Importing Plans routes
import planRoutes from './routes/planRoutes.js';


const app = express();


// Middleware
// Stripe Webhook - must come BEFORE express.json()
import stripeRoutes from './routes/stripe.js';
app.use('/api/stripe', stripeRoutes);

// Then this
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['set-cookie'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser()); // Middleware to parse cookies

// Connect to the database
connectDB();


const port = process.env.PORT || 3000;

// Use user routes with prefix
app.use('/api/users', userRoutes);
//  Use post routes with prefix
app.use('/api/posts', postRoutes);
// Use auth routes with prefix
app.use('/api/auth', authRoutes);
// Use comment routes with prefix
app.use('/api/comments', commentRoutes);
// Use plan routes with prefix
app.use('/api/plans', planRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
