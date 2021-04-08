import Notes from "../models/Notes";

/**
 * Get all notes
 * @param   Request  req
 * @param   Response  res
 */
export const get = async (req, res) => {
  try {
    const notes = await Notes.find();

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
export const getById = async ({ params }, res) => {
  try {
    const { id } = params;

    const note = await Notes.findById(id);

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
export const post = async ({ body }, res) => {
  const { title, description, label } = body;

  if (!title) {
    return res.status(400).send({
      message: "Title is required"
    });
  }

  try {
    const newNote = new Notes({
      title: title,
      description: description,
      label: label
    });

    const noteSave = await newNote.save();

    res.status(200).json(noteSave);
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
export const deleteById = async ({ params }, res) => {
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
export const update = async ({ params, body }, res) => {
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
