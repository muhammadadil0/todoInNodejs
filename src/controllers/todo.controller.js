const postModel = require("../models/todo.model");

async function createToDo(req, res) {
  const { title, description, completed, priority, dueDate } = req.body;

  const todo = await postModel.create({
    title,
    description,
    completed,
    priority,
    dueDate,
  });
  res.status(201).json({
    message: "task created successfully",
    todo,
  });
}

async function getAllList(req, res) {
  const todo = await postModel.find();
  res.status(200).json({
    message: "fetch list successfully",
    todo,
  });
}

async function getById(req, res) {
  const { id } = req.params;
  const todo = await postModel.findById(id);

  res.status(200).json({
    message: "find task successfully",
    todo,
  });
}

async function updateList(req, res) {
  const { id } = req.params;

  const todo = await postModel.findById(id);

  if (!todo) {
    return res.status(404).json({
      message: "Not found list",
    });
  }
  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.priority = req.body.priority;
  todo.completed = req.body.completed;
  await todo.save();
  res.status(200).json({
    message: "todo updated successfully",
    todo,
  });
}

async function deleteList(req, res) {
  const { id } = req.params;

  const todo = await postModel.findByIdAndDelete(id);

  if (!todo) {
    res.status(404).json({
      message: "todo not found",
    });
  }
  res.status(200).json({
    message: "todo deleted successfully",
    todo,
  });
}
async function searchList(req, res) {
  const { keyword } = req.params;

  const todo = await postModel
    .find({
      title: keyword,
    })
    .select("title description");

  if (todo.length === 0) {
    res.status(404).json({
      message: "list not found",
    });
  }
  res.status(200).json({
    message: "list found",
    todo,
  });
}

async function getCompleted(req, res) {
  const { completed } = req.query;

  // Postman query params are strings. Convert to a real boolean.
  const completedBool =
    completed === "true" ||
    completed === true ||
    completed === "1" ||
    completed === 1;

  const todo = await postModel.find({ completed: completedBool });

  res.status(200).json({
    message: "list found",
    todo,
  });
}

async function countDocuments(req, res) {
  const totalCount = await postModel.countDocuments();
  const completedDocument = await postModel.countDocuments({
    completed: true,
  });
  const pendingDocument = await postModel.countDocuments({
    completed: false,
  });
  res.status(200).json({
    totalCount,
    completedDocument,
    pendingDocument,
  });
}

async function getPageList(req, res) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const todo = await postModel.find().skip(skip).limit(limit);
  res.status(200).json({

    page,
    limit,
    todo
  });
}

module.exports = {
  createToDo,
  getAllList,
  getById,
  updateList,
  deleteList,
  searchList,
  getCompleted,
  countDocuments,
  getPageList
};
