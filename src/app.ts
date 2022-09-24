import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";
import * as swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";

const port = config.get<number>("port");
const app = createServer();
import swaggerDocument from "../swagger.json";

//uses body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
});
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
