import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import log from "./logger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      description: "Lovers id api",
      version: "1.0.0",
      title: "Lopvers.com",
      contact: { email: "mdtajalislam1189@gmail.com" },
    },
    host: "localhost:1337/",
    schemes: ["http"],
    paths: {
      "/api/auth/signup": {
        post: {
          parameters: [
            {
              in: "body",
              name: "body",
              schema: { $ref: "#/components/schemas/Auth" },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: { type: "string", format: "binary" },
              },
            },
          },
          responses: {},
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        name: "Authorization",
        in: "header",
        type: "apiKey",
        description: "JWT Authorization header",
      },
    },
    components: {
      schemas: {
        Auth: {
          type: "object",
          properties: {
            email: { type: "string", example: "tajal@gmail.com" },
            username: { type: "string", example: "tajal_islam" },
            password: { type: "string", example: "Aa123123" },
            own_gender: { type: "string", example: "Male" },
            find_gender: { type: "string", example: "Female" },
            mobile_num: { type: "string", example: "+8801883950739" },
            verify_code: { type: "string", example: "1234" },
            verify_time_limit: { type: "string", example: "90" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/schema/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
