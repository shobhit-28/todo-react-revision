import { useContext, useState } from "react"
import { TodoContext } from "../../context/todoContextContainer"

export const TodoHook = (todo) => {
    const { markTodoAsDone, changeTodoDueDate, deleteTodo } = useContext(TodoContext)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const priorityStyles = {
        high: {
            badge: 'bg-red-300 text-red-700',
            dot: 'bg-red-700'
        },
        medium: {
            badge: 'bg-amber-300 text-amber-700',
            dot: 'bg-amber-700'
        },
        low: {
            badge: 'bg-green-300 text-green-700',
            dot: 'bg-green-700'
        }
    }

    const processDate = (date) => {
        const inputDate = new Date(date);
        const today = new Date();

        inputDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        const diffDays = (inputDate - today) / (24 * 60 * 60 * 1000)

        switch (diffDays) {
            case 0:
                return 'Today'
            case -1:
                return 'Yesterday'
            case 1:
                return 'Tomorrow'

            default:
                return date;
        }
    }

    function toggleTodo(id) {
        markTodoAsDone(id)
    }

    function closeCalendar(date) {
        changeTodoDueDate(todo.id, date)
        setIsCalendarOpen(false)
    }
    const deletetodo = () => {
        deleteTodo(todo.id)
    }

    return { isCalendarOpen, setIsCalendarOpen, priorityStyles, processDate, toggleTodo, closeCalendar, deletetodo }
}