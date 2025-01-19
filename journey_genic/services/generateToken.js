import jwt from 'jsonwebtoken';

// Secret key (should be in .env file)
const JWT_SECRET = process.env.JWT_SECRET || "";

// Generate JWT
export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};