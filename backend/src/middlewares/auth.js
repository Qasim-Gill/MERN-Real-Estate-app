import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    // Check for token in cookies, headers, or body
    // console.log('=== COOKIE DEBUGGING ===');
    // console.log('Request origin:', req.headers.origin);
    // console.log('Raw cookie header:', req.headers.cookie);
    // console.log('Parsed cookies:', req.cookies);
    // console.log('All headers:', JSON.stringify(req.headers, null, 2));
    const token =
        req.cookies?.token ||
        req.headers?.authorization?.replace('Bearer ', '') ||
        req.body?.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attaches user id to req.user
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default auth;
