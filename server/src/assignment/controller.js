import Assignment from "./model.js";
import Classes from "../classes/model.js";

export const create = async (req, res) => {
  const user_id = req.user.id;
  const { class_id } = req.params;
  const { name, duedate, score_value } = req.body;

  if (!user_id) return res.status(401).json({ error: "Unauthorized" });
  if (!class_id || !name || !duedate || !score_value)
    throw new Error("Credential Not Complete");

  try {
    const classes_query = await Classes.findOne({ _id: class_id });
    if (!classes_query) throw new Error("Class Not Existed");

    const assigment_query = await Assignment.create({
      ref_class: classes_query._id,
      name,
      duedate,
      score_value,
    });
    if (!assigment_query) throw new Error("Failed to create new Assignment");
    res.status(200).json(assigment_query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  const user_id = req.user.id;
  const { class_id } = req.params;
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });
  if (!class_id) throw new Error("Credential Not Complete");

  try {
    const assignment_query = await Assignment.find({ ref_class: class_id });
    if (!assignment_query) throw new Error("Failed to get data");
    res.status(200).json(assignment_query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });
  if (!id) throw new Error("Credential Not Complete");

  try {
    const assignment_query = await Assignment.findById(id);
    if (!assignment_query) throw new Error("Failed to get item");
    res.status(200).json(assignment_query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });
  if (!id) throw new Error("Credential Not Complete");

  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment)
      return res.status(404).json({ error: "Assignment not found" });

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });
  if (!id) throw new Error("Credential Not Complete");

  try {
    const assignment = await Assignment.findById(id);

    if (!assignment)
      return res.status(404).json({ error: "Assignment not found" });

    assignment.status = !assignment.status;
    const updatedAssignment = await assignment.save();

    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateScore = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  const { newScore } = req.body;
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });
  if (!id) throw new Error("Credential Not Complete");

  try {
    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ error: "Assignment not found" });
    assignment.score_value = newScore;
    const updated = await assignment.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
