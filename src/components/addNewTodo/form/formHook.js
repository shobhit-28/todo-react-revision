import { useContext, useEffect, useRef } from "react"
import { TodoContext } from "../../../context/todoContextContainer"
import { useForm, useWatch } from "react-hook-form"
import flatpickr from "flatpickr"

export const AddTodoFormHook = () => {
    const { openCloseTodo, isAddTodoFormOpen, addNewTodo, defaultTodoData, currSelectedTodoForEditing, updateTodo } = useContext(TodoContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset
    } = useForm(
        defaultTodoData
    )

    const onSubmit = data => {
        if (Object.keys(errors).length === 0) {
            if (currSelectedTodoForEditing?.isEditing) {
                updateTodo(data)
            } else {
                addNewTodo(data)
            }
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
        if (currSelectedTodoForEditing.isEditing) {
            reset(currSelectedTodoForEditing.value)
        } else {
            reset(defaultTodoData)
        }
    }, [currSelectedTodoForEditing.isEditing, currSelectedTodoForEditing.value, defaultTodoData, reset])

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

    return { openCloseTodo, isAddTodoFormOpen, register, handleSubmit, setValue, onSubmit, priority, errors, calendarRef, currSelectedTodoForEditing }
}