import { useState } from "react";
import { todos } from '../data/data.json'
import { TodoContext } from "./todoContextContainer";

export const TodoContextHandler = ({ children }) => {
    const [todoData, setTodoData] = useState(todos)

    const markTodoAsDone = (todoId) => {
        setTodoData(todoData.map((todo) => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo))
    }

    const changeTodoDueDate = (todoId, newDate) => {
        setTodoData(todoData.map((todo) => todo.id === todoId ? { ...todo, dueDate: newDate } : todo))
    }

    return <TodoContext.Provider value={{
        todoData,
        markTodoAsDone,
        changeTodoDueDate
    }}>
        {children}
    </TodoContext.Provider>
}