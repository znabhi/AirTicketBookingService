const express = require("express");
const app = express();
const { PORT } = require("./src/config/serverConfig");
const apiRouter = require("./src/routers/index");
// const db = require("./src/models");
const bodyParser = require("body-parser");
const createServer = async () => {
  app.listen(PORT, async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", apiRouter);
    // if (process.env.DB_SYNC) {
    //   db.sequelize.sync({ alter: true });
    // }
    console.log(`Server is running on port ${PORT}`);
  });
};

createServer();
