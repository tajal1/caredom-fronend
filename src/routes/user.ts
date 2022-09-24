import { Express } from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createUserHandler } from "../controller/user.controller";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSessionHandler } from "../controller/session.controller";

function routes(app: Express) {
  app.post(
    "/api/auth/signup",
    validateResource(createUserSchema),
    createUserHandler
  );
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
}

export default routes;
