import Notes from "../models/Notes";

/**
 * Get all notes
 * @param   Request  req
 * @param   Response  res
 */
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: "UPS!" });
  }
};

/**
 * Get note by Id
 *
 * @param   Request  req
 * @param   Response  res
 */
export const getNotesById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Notes.findById(id);

    if (!note) return res.status(400).send({ message: "Nota no encontrada" });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message || "OPS!"
    });
  }
};
