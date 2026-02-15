export const updateQuery = `update public."Todos"
set 
  title = $1,
  description = $2,
  completed = $3,
  priority = $4,
  "dueDate" = $5
where id = $6
returning *;`