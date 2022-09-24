import express from "express";
import userRoutes from "../routes/user";
import deserializeUser from "../middleware/deserializeUser";

function createServer() {
  const app = express();
  app.use(express.json());
  app.use(deserializeUser);

  userRoutes(app);

  return app;
}

export default createServer;
