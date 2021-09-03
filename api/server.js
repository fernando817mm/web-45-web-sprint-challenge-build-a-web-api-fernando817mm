const express = require("express");
const server = express();
const morgan = require("morgan");

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use(morgan("dev"));

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("*", (req, res) => {
  res.send(`
    <h1>Fernando Martinez Sprint Challenge</h1>
  `);
});

module.exports = server;
