import Classes from "./model.js";

export const create = async (req, res) => {
  const { semester_id } = req.params;
  const { class_name, lecturer, priority } = req.body;
  if (!semester_id)
    return res.status(400).json({ error: "Credential Not Complete" });

  try {
    const queryItem = await Classes.create({
      ref_semester: semester_id,
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


export const updateScore = async (req, res) => {
  const { id } = req.params
  const { score } = req.body
  if (!id) return res.status(400).json({ error: "Credential Not Complete" });

  try {
    const classes = await Classes.findById(id)
    if(!classes) throw new Error('Class not existed')
    classes.total_score += Number(score)
    const updated = await classes.save()
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}