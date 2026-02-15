export const insertQuery = `
  insert into public."Todos"
  (title, description, completed, priority, "dueDate")
  values ($1, $2, $3, $4, $5)
  returning *;
`;