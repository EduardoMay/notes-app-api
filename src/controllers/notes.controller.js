import Notes from "../models/Notes";

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: "UPS!" });
  }
};
