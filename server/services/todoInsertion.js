import { pool } from "../DB/db.js"
import { insertQuery } from "../Queries/insertQuery.js"

export const insertTodo = async ({
    title,
    description,
    priority,
    dueDate
}) => {
    const values = [title, description, false, priority, dueDate]
    const result = await pool.query(insertQuery, values)

    return result.rows[0]
}