import { Request, Response } from "express";
import Notes from "../models/Notes";

/**
 * Set favorite
 * @param   Request  req
 * @param   Response  res
 */
export const setFavorite = async ({ params, body }: Request, res: Response) => {
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
