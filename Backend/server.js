import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';         // Cross-Origin Resource Sharing
import { connectDB } from './config/mongodb.js';
import { connectCloudinary } from './config/cloudinary.js';
import { userRouter } from './routes/userRoute.js'; 
import { productRouter } from './routes/productRoute.js';
import { cartRouter } from './routes/cartRoute.js';
import { orderRouter } from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT;

// Database Connection
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());                    // To parse JSON request bodies
app.use(cors());                           // To allow requests from your frontend

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root Endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

app.get("/test-env", (req, res) => {
  res.json({
    cloud_name: process.env.CLOUDINARY_NAME ? "Found" : "Missing",
    api_key: process.env.CLOUDINARY_API_KEY ? "Found" : "Missing",
    secret: process.env.CLOUDINARY_SECRET_KEY ? "Found" : "Missing",
  });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

