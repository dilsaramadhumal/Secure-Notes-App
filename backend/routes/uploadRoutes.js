import express from "express";
import upload from "../utils/s3Upload.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully!",
    fileUrl: req.file.location,
  });
});

export default router;
