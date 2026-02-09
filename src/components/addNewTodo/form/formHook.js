import { useContext, useEffect, useRef } from "react"
import { TodoContext } from "../../../context/todoContextContainer"
import { useForm, useWatch } from "react-hook-form"
import flatpickr from "flatpickr"

export const AddTodoFormHook = () => {
    const { openCloseTodo, isAddTodoFormOpen, addNewTodo } = useContext(TodoContext)

    const getTodaysDate = () => {
        const date = new Date("Mon Feb 09 2026 12:37:05 GMT+0530")

        return date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0")
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            completed: false,
            priority: "medium",
            dueDate: getTodaysDate()
        }
    })

    const onSubmit = data => {
        if (Object.keys(errors).length === 0) {
            console.log("FORM DATA:", data)
            addNewTodo(data)
        }
    }

    const calendarRef = useRef(null);


    const dueDate = useWatch({
        control,
        name: "dueDate"
    })

    const priority = useWatch({
        control,
        name: "priority"
    })

    useEffect(() => {
        if (!isAddTodoFormOpen) {
            reset()
            return
        }
        const id = requestAnimationFrame(() => {
            flatpickr(calendarRef.current, {
                inline: true,
                monthSelectorType: "static",
                showMonths: 1,
                dateFormat: "Y-m-d",
                defaultDate: dueDate,
                onChange: (_, dateStr) => {
                    setValue("dueDate", dateStr, { shouldValidate: true })
                }
            })
        })

        return () => cancelAnimationFrame(id)
    }, [dueDate, isAddTodoFormOpen, reset, setValue])

    return { openCloseTodo, isAddTodoFormOpen, register, handleSubmit, setValue, onSubmit, priority, errors, calendarRef }
}