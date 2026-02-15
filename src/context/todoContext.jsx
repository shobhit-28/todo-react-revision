import { useEffect, useState } from "react";
import { todos } from '../data/data.json'
import { TodoContext } from "./todoContextContainer";
import axios from "axios";

export const TodoContextHandler = ({ children }) => {
    const baseTodoUrl = 'http://localhost:5000/todo'

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

    useEffect(() => {
        axios.get(`${baseTodoUrl}/getTodos`).then(res => setTodoData(res.data)).catch((err) => console.error(err))
    }, [])

    const markTodoAsDone = (todoArg) => {
        const updatedTodo = { ...todoArg, completed: !todoArg.completed }
        updateTodoApiCall(updatedTodo).then(() => {
            setTodoData(todoData.map((todo) => todo.id === updatedTodo?.id ? updatedTodo : todo))
        }).catch((err) => console.error(err))
    }

    const changeTodoDueDate = (todoArg, newDate) => {
        if (newDate) {
            const updatedTodo = { ...todoArg, dueDate: newDate }
            updateTodoApiCall(updatedTodo).then(() => {
                setTodoData(todoData.map((todo) => todo.id === updatedTodo?.id ? updatedTodo : todo))
            }).catch((err) => console.error(err))
        }
    }

    const addNewTodo = (todo) => {
        axios.post(`${baseTodoUrl}/createTodo`, todo).then((res) => {
            setTodoData([...todoData, { ...todo, id: res.data?.id, createdAt: res.data?.createdAt }])
            openCloseTodo()
        }).catch(err => console.error(err))
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

    const deleteTodo = (todoId) => deleteTodos([todoId]).then(() => {
        setTodoData(todoData.filter((todo) => todo.id !== todoId))
    }).catch((err) => console.error(err))

    const deleteMultiTodos = () => {
        const processedTodoData = {
            remainingTodos: [],
            selectedIds: []
        }
        for (const todo of todoData) {
            if (todoSelectedObj[todo.id]) {
                processedTodoData['selectedIds'].push(todo.id)
            } else {
                processedTodoData['remainingTodos'].push(todo)
            }
        }
        deleteTodos(processedTodoData.selectedIds).then(() => {
            setTodoData(processedTodoData.remainingTodos)
            setTodoSelectedObj(prev => {
                const updated = { ...prev }
                Object.keys(updated).forEach(id => {
                    if (updated[id]) delete updated[id]
                })
                return updated
            })
            setIsAnySelected(false)
        }).catch(err => console.error(err))
    }

    const deleteTodos = (todoIds) => { 
        console.log(todoIds)
        return axios.delete(`${baseTodoUrl}/deleteTodos`, {data: todoIds})
    }

    const openTodoEditor = (todo) => {
        console.log(todo)
        setCurrSelectedTodoForEditing({ value: todo, isEditing: true })
        setIsAddTodoFormOpen(true)
    }

    const updateTodo = (updatedTodo) => {
        updateTodoApiCall(updatedTodo).then(() => {
            setTodoData(todoData.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo
                } else {
                    return todo
                }
            }))
            openCloseTodo()
        }).catch((err) => console.error(err))
    }

    const updateTodoApiCall = (updatedTodo) => axios.put(`${baseTodoUrl}/updateTodo/${updatedTodo?.id}`, updatedTodo)

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