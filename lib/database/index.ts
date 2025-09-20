import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Use global object to cache the connection (prevents multiple connections in dev)
let cached = (global as any).mongoose || { conn: null, promise: null };

// Function to connect to MongoDB
export const connectToDatabase = async () => {
  // If already connected, reuse the connection
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  // If no existing promise, create a new connection promise
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: 'evently', // Specify DB name
      bufferCommands: false, // Disable mongoose buffering
    });

  // Await the promise and store the connection
  cached.conn = await cached.promise;

  // Return the connected instance
  return cached.conn;
};
