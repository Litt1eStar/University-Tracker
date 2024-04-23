import Semester from "./model.js";

export const create = async (req, res) => {
  const { year_id, semester } = req.params;
  const user = req.user;

  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (!semester || !year_id) throw new Error("Credential Not Complete");

  try {
    const existed = await Semester.findOne({ ref_year: year_id, semester });
    if (existed) throw new Error("This semester already created");

    const queryItem = await Semester.create({ ref_year: year_id, semester });
    if (!queryItem) throw new Error("Failed to create Item");
    res.status(200).json(queryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  const { year_id } = req.params;

  if (!year_id) throw new Error("Credential Not Complete");
  try {
    const queryItem = await Semester.find({ ref_year: year_id });
    if (!queryItem) throw new Error("Failed to get Item");
    res.status(200).json(queryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Credential Not Complete");
  try {
    const queryItem = await Semester.findOne({ _id: id });
    console.log(queryItem);
    if (!queryItem) throw new Error("Failed to get Item");
    res.status(200).json(queryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Credential Not Complete");
  try {
    await Semester.findOneAndDelete({ _id: id })
      .then(() => {
        res.status(200).json({ message: "Successfully" });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};
