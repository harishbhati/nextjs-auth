import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// At this point, TypeScript still thinks MONGODB_URI could be undefined
// So we can assert it as a string using the non-null assertion operator `!`

declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Mongoose> | null };
}

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongooseInstance) => {
      console.log("MongoDB connected");
      return mongooseInstance;
    });
  }

  cached.conn = (await cached.promise).connection;
  return cached.conn;
}

export default connectDB;
