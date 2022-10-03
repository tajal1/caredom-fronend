import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { inputValidationError } from "../common/response";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("here");

      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      console.log(e);

      return res.status(400).send(inputValidationError(e.errors));
    }
  };

export default validate;
