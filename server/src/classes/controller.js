import Score from '../score/model.js'
import Classes from "./model.js";

export const create = async (req, res) => {
  const { semester_id } = req.params;
  const { class_name, lecturer, priority } = req.body;
  if (!semester_id)
    return res.status(400).json({ error: "Credential Not Complete" });

  try {
    const score = await Score.create({value: 0, max_value: 0});
    if (!score) throw new Error('Failed to create new score')
    const queryItem = await Classes.create({
      ref_semester: semester_id,
      ref_score: score._id,
      class_name,
      lecturer,
      priority
    });
    if (!queryItem) throw new Error("Failed to Create New Item");
    res.status(200).json(queryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  const { semester_id } = req.params;
  
  if (!semester_id)
    return res.status(400).json({ error: "Credential Not Complete" });
  try {
    const queryItem = await Classes.find({ ref_semester: semester_id });    
    if (!queryItem) throw new Error("Failed to get Item");
    res.status(200).json(queryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Credential Not Complete" });
  try {
    const queryItem = await Classes.findById(id);
    if (!queryItem) throw new Error("Failed to get Item");
    res.status(200).json(queryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Credential Not Complete" });
  try {
    await Classes.findOneAndDelete({ _id: id })
      .then(() => {
        res.status(200).json({ message: "Succesfully" });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
