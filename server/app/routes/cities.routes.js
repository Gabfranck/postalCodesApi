import cities from "../controllers/cities.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve all Tutorials
  router.get("/", cities.findAll);

  app.use("/cities", router);
};
