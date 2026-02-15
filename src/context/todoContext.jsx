import { useState } from "react";
import { todos } from '../data/data.json'
import { TodoContext } from "./todoContextContainer";

export const TodoContextHandler = ({ children }) => {
    const getTodaysDate = () => {
        const date = new Date()

        return date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0")
    }

    const defaultTodoData = {
        title: "",
        description: "",
        completed: false,
        priority: "medium",
        dueDate: getTodaysDate()
    }

    const tempObj = {}
    for (let index = 0; index < todos.length; index++) {
        tempObj[todos[index].id] = false
    }

    const [todoData, setTodoData] = useState(todos)
    const [isAddTodoFormOpen, setIsAddTodoFormOpen] = useState(false)
    const [currSelectedTodoForEditing, setCurrSelectedTodoForEditing] = useState({ data: defaultTodoData, isEditing: isAddTodoFormOpen })
    const [todoSelectedObj, setTodoSelectedObj] = useState(tempObj)
    const [isAnySelected, setIsAnySelected] = useState(false)

    const markTodoAsDone = (todoId) => {
        setTodoData(todoData.map((todo) => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo))
    }

    const changeTodoDueDate = (todoId, newDate) => {
        if (newDate) {
            setTodoData(todoData.map((todo) => todo.id === todoId ? { ...todo, dueDate: newDate } : todo))
        }
    }

    const addNewTodo = (todo) => {
        const now = new Date()
        const iso = now.toISOString()
        setTodoData([...todoData, { ...todo, id: `t_${todoData.length + 1}`, createdAt: iso }])
        openCloseTodo()
    }

    const openCloseTodo = () => {
        setIsAddTodoFormOpen(!isAddTodoFormOpen)
        if (!isAddTodoFormOpen) {
            setCurrSelectedTodoForEditing({
                value: defaultTodoData,
                isEditing: isAddTodoFormOpen
            })
        }
    }

    const deleteTodo = (todoId) => setTodoData(todoData.filter((todo) => todo.id !== todoId))

    const deleteMultiTodos = () => {
        setTodoData(todoData.filter((todo) => !todoSelectedObj[todo.id]))
        setTodoSelectedObj(prev => {
            const updated = { ...prev }
            Object.keys(updated).forEach(id => {
                if (updated[id]) delete updated[id]
            })
            return updated
        })
        setIsAnySelected(false)
    }

    const openTodoEditor = (todo) => {
        console.log(todo)
        setCurrSelectedTodoForEditing({ value: todo, isEditing: true })
        setIsAddTodoFormOpen(true)
    }

    const updateTodo = (updatedTodo) => {
        setTodoData(todoData.map((todo) => {
            if (todo.id === updatedTodo.id) {
                return updatedTodo
            } else {
                return todo
            }
        }))
        openCloseTodo()
    }

    const selectTodo = todoId => {
        setTodoSelectedObj(prev => {
            const updated = {
                ...prev,
                [todoId]: !prev?.[todoId]
            }

            setIsAnySelected(Object.values(updated).some(Boolean))

            return updated
        })
    }

    return <TodoContext.Provider value={{
        todoData,
        markTodoAsDone,
        changeTodoDueDate,
        isAddTodoFormOpen,
        openCloseTodo,
        addNewTodo,
        deleteTodo,
        openTodoEditor,
        currSelectedTodoForEditing,
        defaultTodoData,
        updateTodo,
        todoSelectedObj,
        selectTodo,
        isAnySelected,
        deleteMultiTodos
    }}>
        {children}
    </TodoContext.Provider>
}