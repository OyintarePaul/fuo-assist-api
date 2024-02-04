import mongoose from "mongoose";
const dbURL = process.env.MONGO_DB_URL!;
console.log(dbURL);

export async function connectDB() {
  const connection = await mongoose.connect(dbURL);
  return connection;
}
