import express from "express";
import userRoutes from "../routes/user";
import cors from "cors";
import bodyParser from "body-parser";

import deserializeUser from "../middleware/deserializeUser";

function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.json());
  app.use(cors());

  app.use(deserializeUser);

  userRoutes(app);

  return app;
}

export default createServer;
