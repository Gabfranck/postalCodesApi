import search from "../controllers/search.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve all Tutorials
  router.get("/", search.findAll);

  app.use("/search", router);
};
