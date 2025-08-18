import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5175", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/products", productRoutes);

app.listen(5000, async () => {
  await connectDB();
  console.log("🚀 Server is running on port 5000");
});
