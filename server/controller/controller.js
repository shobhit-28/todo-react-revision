import { pool } from "../DB/db.js"
import { updateTodoService } from "../services/dataUpdation.js"
import { deleteTodos } from "../services/todoDeletion.js"
import { insertTodo } from "../services/todoInsertion.js"

export const getTodoList = async (req, res) => {
    try {
        const rows = await pool.query(`select * from "Todos"`)
        console.log(rows.rows)
        return res.status(200).json(rows.rows)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Server error" })
    }
}

export const addTodo = async (req, res) => {
    try {
        const response = await insertTodo(req.body)
        res.status(201).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.message })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const ids = req.body
        if (Array.isArray(ids) && ids.length > 0) {
            const response = await deleteTodos(ids)
            res.status(200).json(response)
        } else {
            return res.status(400).json({ error: 'Payload must be a non empty array' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.message })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, completed, priority, dueDate } = req.body
        const values = [title, description, completed, priority, dueDate, id]
        const rows = await updateTodoService(values);
        if (rows.length > 0) {
            res.status(200).json(rows)
        } else {
            res.status(404).json('Todo not found')
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}