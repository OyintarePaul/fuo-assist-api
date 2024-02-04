import "dotenv/config";
import { app } from "./express";
import { connectDB } from "./db";

const port = process.env.PORT || 5000;

connectDB().then((connection) => {
  console.log("Database connected");
});

app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
});
