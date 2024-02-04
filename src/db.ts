import mongoose from "mongoose";
const dbURL = "mongodb://localhost:27017/fuo-assist-db";

console.log(dbURL);

export async function connectDB() {
  const connection = await mongoose.connect(dbURL);
  return connection;
}
