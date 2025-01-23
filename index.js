const express = require("express");
const app = express();
const { PORT } = require("./src/config/serverConfig");
const createServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

createServer();
