import search from "../controllers/cities/search.controller.js";
import near from "../controllers/cities/near.controller.js";

import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve all Tutorials
  router.get("/search", search.findAll);
  router.get("/near", near.findAll);

  app.use("/cities", router);
};
