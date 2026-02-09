import { useState } from "react";
import { todos } from '../data/data.json'
import { TodoContext } from "./todoContextContainer";

export const TodoContextHandler = ({ children }) => {
    const [todoData, setTodoData] = useState(todos)
    const [isAddTodoFormOpen, setIsAddTodoFormOpen] = useState(false)

    const markTodoAsDone = (todoId) => {
        setTodoData(todoData.map((todo) => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo))
    }

    const changeTodoDueDate = (todoId, newDate) => {
        setTodoData(todoData.map((todo) => todo.id === todoId ? { ...todo, dueDate: newDate } : todo))
    }

    const addNewTodo = (todo) => {
        const now = new Date()
        const iso = now.toISOString()
        setTodoData([...todoData, { ...todo, id: `t_${todoData.length + 1}`, createdAt: iso }])
        openCloseTodo()
    }

    const openCloseTodo = () => setIsAddTodoFormOpen(!isAddTodoFormOpen)

    return <TodoContext.Provider value={{
        todoData,
        markTodoAsDone,
        changeTodoDueDate,
        isAddTodoFormOpen,
        openCloseTodo,
        addNewTodo
    }}>
        {children}
    </TodoContext.Provider>
}