import city from "../controllers/city.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve all Tutorials
  router.get("/city", city.findAll);

  app.use("/code", router);
};
