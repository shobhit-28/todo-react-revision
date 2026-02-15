import { pool } from "../DB/db.js"

export const deleteTodos = async (ids) => {
    const result = await pool.query(
        `delete from public."Todos"
             where id = any($1::uuid[])
             returning *`,
        [ids]
    )

    return result.rows
}