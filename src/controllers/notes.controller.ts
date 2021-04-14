import { Request, Response } from "express";
import { Label } from "src/interfaces/Label";
import { Note } from "src/interfaces/Note";
import Labels from "../models/Labels";
import Notes from "../models/Notes";

/**
 * Get all notes
 * @param   Request  req
 * @param   Response  res
 */
export const get = async (req: Request, res: Response) => {
  try {
    const notes: Note[] = await Notes.find();

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};

/**
 * Get note by Id
 * @param   Request  req
 * @param   Response  res
 */
export const getById = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    const note: Note = await Notes.findById(id);

    if (!note) return res.status(400).send({ message: "Nota no encontrada" });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};

/**
 * Save note in the database
 * @param   Request  req
 * @param   Response  res
 */
export const post = async ({ body }: Request, res: Response) => {
  const { title, description, label, favorite } = body;
  const { label_id } = label;
  let saveLabel;

  if (!title) {
    return res.status(400).send({
      message: "Title is required"
    });
  }

  try {
    const newNote = new Notes({
      title,
      description,
      label,
      favorite
    });

    const noteSave: Note = await newNote.save();

    if (label_id) {
      const label: Label = await Labels.findById(label_id);

      label.notes.push(noteSave._id);

      saveLabel = await Labels.findByIdAndUpdate(label_id, label);
    }

    res.status(200).json({ noteSave, saveLabel });
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};

/**
 * dELETE note by Id
 * @param   Request  req
 * @param   Response  res
 */
export const deleteById = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    await Notes.findByIdAndDelete(id);

    res.status(200).json({
      message: "Nota eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};

/**
 * Update note by Id
 * @param   Request  req
 * @param   Response  res
 */
export const update = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;

    await Notes.findByIdAndUpdate(id, body);

    res.json({
      message: "Nota actualizado"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};
