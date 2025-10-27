// routes/notes.js
import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all notes for user
router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

// POST create a new note
router.post("/", authMiddleware, async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    userId: req.user.id,
  });
  await note.save();
  res.status(201).json(note);
});

// DELETE note
router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Note deleted" });
});

export default router;
