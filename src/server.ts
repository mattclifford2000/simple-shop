import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const port = process.env.PORT || 8080;

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("./database/initDB")();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

import AuthRoute from "./routes/Auth.route";
app.use("/auth", AuthRoute);

app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("Server active");
});
app.get("*", (req: Request, res: Response) => {
    return res.status(404).send("Invalid route.");
});

app.listen(port, () => console.log(`Listening on port: ${port}`));

export default app;
