import { Request, Response } from "express";
import { Label } from "src/interfaces/Label";
import { Note } from "src/interfaces/Note";
import Labels from "../models/Labels";
import Notes from "../models/Notes";
import _ from "lodash";

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

    if (label) {
      const findLabel: Label = await Labels.findById(label);
      const addNoteId = { id: noteSave._id };

      findLabel.notes.push(addNoteId);

      saveLabel = await Labels.findByIdAndUpdate(label, findLabel);
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
    const { label } = body;

    const { label: oldLabel } = await Notes.findByIdAndUpdate(id, body);

    if (oldLabel !== "") {
      const { _doc: labelSelected } = await Labels.findById(oldLabel);

      if (String(labelSelected._id) !== label) {
        const { notes } = labelSelected;

        const oldNotesLabels = _.filter(
          notes,
          (n) => String(n.id) !== String(id)
        );

        const { _doc: newLabelSelected } = await Labels.findById(label);

        newLabelSelected.notes.push({ id: id });

        console.log("------- Remove Old Note of Label -------");
        console.log(oldNotesLabels);
        await Labels.findByIdAndUpdate(oldLabel, { notes: oldNotesLabels });

        console.log("------- Set New Note to Label -------");
        console.log(newLabelSelected);

        await Labels.findByIdAndUpdate(label, {
          notes: newLabelSelected.notes
        });
      }
    } else {
      const { _doc: newLabelSelected } = await Labels.findById(label);

      newLabelSelected.notes.push({ id: id });

      console.log("------- Add New Note to Label -------");
      console.log(newLabelSelected);

      await Labels.findByIdAndUpdate(label, {
        notes: newLabelSelected.notes
      });
    }

    res.json({
      message: "Nota actualizada"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};
