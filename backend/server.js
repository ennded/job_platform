import dotenv from 'dotenv';
import app from "./app.js";
import cloudinary from "cloudinary";
import cors from 'cors';

dotenv.config(); // Load environment variables from .env

// Cloudinary Configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_APIKEY,
    api_secret: process.env.CLOUDINARY_CLIENT_APISECRET
});

// Validate Cloudinary Configuration
const cloudConfig = cloudinary.v2.config();
if (!cloudConfig.cloud_name || !cloudConfig.api_key || !cloudConfig.api_secret) {
    console.error("Cloudinary Configuration error: Missing environment variables");
}

// Enable CORS for specific origin
app.use(cors({
    origin: 'http://localhost:5174', // Specify your frontend URL
    credentials: true, // Allow cookies
}));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
