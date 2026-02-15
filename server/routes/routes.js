import express from 'express';
import { addTodo, deleteTodo, getTodoList, updateTodo } from '../controller/controller.js';

const router = express.Router();

router.get('/getTodos', getTodoList);
router.post('/createTodo', addTodo);
router.delete('/deleteTodos', deleteTodo);
router.put('/updateTodo/:id', updateTodo);

export default router;