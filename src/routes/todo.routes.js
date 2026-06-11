const express = require('express')
const todoController = require('../controllers/todo.controller')
const router = express.Router();

router.post('/todo',todoController.createToDo)
router.get('/list',todoController.getAllList)
router.get('/todos/:id',todoController.getById)
router.patch('/todo/:id',todoController.updateList)
router.delete('/todo/:id',todoController.deleteList)
router.get('/search/:keyword',todoController.searchList),
router.get('/todoss', todoController.getCompleted);
router.get('/total',todoController.countDocuments);
router.get('/todos',todoController.getPageList)
module.exports = router;