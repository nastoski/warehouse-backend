import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI, MONGODB_DB_NAME } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: MONGODB_DB_NAME,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected successfully to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }

    mongoose.connection.on('disconnected', () => {
        console.error('MongoDB connection disconnected');
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
};

export default connectDB;