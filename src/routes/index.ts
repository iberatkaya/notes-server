import express from "express";

let router = express.Router();

router.get("/", function (_req, res, _next) {
  res.send("Note API");
});

export default router;
