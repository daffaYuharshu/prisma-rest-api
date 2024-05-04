const express = require("express");
const prisma = require("../database/prisma");
const createNote = require("../services/createNote");
const getAllNote = require("../services/getAllNote");
const getNoteById = require("../services/getNoteById");
const updateNoteById = require("../services/updateNoteById");
const deleteNoteById = require("../services/deleteNoteById");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send({
      error: "true",
      message: "Ada field yang kosong",
    });
  }

  try {
    const note = await createNote(title, content);
    res.send({
      error: "false",
      message: "Catatan berhasil ditambahkan",
      data: note,
    });
  } catch (error) {
    res.status(500).send({
      error: "true",
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await getAllNote();
    res.send({
      error: "false",
      data: notes,
    });
  } catch (error) {
    res.status(500).send({
      error: "true",
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const note = await getNoteById(id);
    res.send({
      error: "false",
      data: note,
    });
  } catch (error) {
    res.status(404).send({
      error: "true",
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send({
      error: "true",
      message: "Ada field yang kosong",
    });
  }

  try {
    await updateNoteById(id, { title, content });
    res.send({
      error: "false",
      message: "Catatan berhasil diubah",
    });
  } catch (error) {
    res.status(404).send({
      error: "true",
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  try {
    await updateNoteById(id, { title, content });

    res.send({
      error: "false",
      message: "Catatan berhasil diubah",
    });
  } catch (error) {
    res.status(404).send({
      error: "true",
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await deleteNoteById(id);

    res.send({
      error: "false",
      message: "Catatan berhasil dihapus",
    });
  } catch (error) {
    res.status(404).send({
      error: "true",
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
