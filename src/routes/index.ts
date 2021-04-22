import express from "express";

const router = express.Router();

router.get("/", function (_req, res) {
  res.send("Note API");
});

export default router;
