import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { router as accommodationsRouter } from "./routes/accommodation";
import { router as userRouter } from "./routes/user";
import { router as chatRouter } from "./routes/chat";
import { router as postRouter } from "./routes/post";

const app: Express = express();

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi, welcome to the FUO Assist Rest API");
});

app.use("/users", userRouter);
app.use("/accommodations", accommodationsRouter);
app.use("/posts", postRouter);
app.use("/chat", chatRouter);

export { app };
