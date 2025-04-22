import postalCode from "../controllers/postalCodes.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve all Tutorials
  router.get("/", postalCode.findAll);

  app.use("/api/postal-codes", router);
};
