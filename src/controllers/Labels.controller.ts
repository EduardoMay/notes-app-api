import { Request, Response } from "express";
import Labels from "../models/Labels";

/**
 * Save Label
 * @param   Request  req
 * @param   Response  res
 */
export const post = async ({ body }: Request, res: Response) => {
  const { description, color } = body;

  if (!description || !color)
    return res.status(400).send({
      message: "Description and Color is required"
    });

  try {
    const setLabel = new Labels({
      description,
      color
    });

    const labelSave = await setLabel.save();

    res.status(200).json(labelSave);
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};

/**
 * get all Labels
 * @param   Request  req
 * @param   Response  res
 */
export const get = async (req: Request, res: Response) => {
  try {
    const labels = await Labels.find();

    const addTotal = labels.map((label: any) => {
      return { ...label._doc, totalNotes: label.notes.length };
    });

    res.status(200).json(addTotal);
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};

/**
 * Delete Labels
 * @param   Request  req
 * @param   Response  res
 */
export const deleteLabel = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;

    await Labels.findByIdAndDelete(id);

    res.status(200).json({
      message: "Label eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};

/**
 * Update Label
 * @param   Request  req
 * @param   Response  res
 */
export const update = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;

    await Labels.findByIdAndUpdate(id, body);

    res.json({
      message: "Actualizado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};
