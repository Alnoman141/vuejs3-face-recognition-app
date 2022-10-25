module.exports = app => {
  const tutorials = require("../controller/face-controller");

  const router = require("express").Router();

  // Create a new Tutorial
  router.post("/save", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  app.use("/api/face", router);
};
