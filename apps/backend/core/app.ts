import express, {Application} from "express";
import userRoutes from "../routes/userRoutes";
import {add} from "@repo/math/add";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

console.log(add(1, 2));

app.use("/api/v1", userRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send({success: false, message: "Internal server error."});
});

export default app;
