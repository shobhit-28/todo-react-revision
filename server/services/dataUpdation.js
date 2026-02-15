import { pool } from "../DB/db.js"
import { updateQuery } from "../Queries/updateQuery.js"

export const updateTodoService = async (values) => {
    const res = await pool.query(updateQuery, values)

    return res.rows
}