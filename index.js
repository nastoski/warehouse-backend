import express from "express";
import connectDB from './db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import itemRoutes from './routes/item.js';
import storeRoutes from './routes/store.js';
import warehouseRoutes from './routes/warehouse.js';
import transferRoutes from './routes/transfer.js';


const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
  }));
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/transfers', transferRoutes);

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(8080, () => {
    console.log("Server is running");
});