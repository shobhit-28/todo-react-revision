import { CiCalendar } from "react-icons/ci"
import { Calendar } from "../calendar/calendar"
import { TodoHook } from "./todoCardHook"
import { TbEdit } from "react-icons/tb"
import { AiOutlineDelete } from "react-icons/ai"

export const TodoCard = ({ todo }) => {
    const { isCalendarOpen,
        setIsCalendarOpen,
        priorityStyles,
        processDate,
        toggleTodo,
        closeCalendar,
        deletetodo,
        editTodo,
        isSelected,
        selectTodoCard,
        conditionalSelection
    } = TodoHook(todo)
    const handleDoubleClick = () => selectTodoCard(todo.id)
    const handleSingleClick = () => conditionalSelection(todo.id)
    return (
        <>
            <div
                className={`group relative rounded w-72 p-4 flex flex-col gap-2 cursor-pointer 
                    ${isSelected
                        ?
                        'bg-blue-100 ring-2 ring-blue-600 shadow-[rgba(0,_0,_255,_0.35)_0px_6px_14px]'
                        :
                        todo.completed
                            ?
                            'bg-green-100'
                            :
                            'bg-orange-100'} 
                shadow-[rgba(0,_0,_0,_0.24)_0px_1px_3px] duration-700 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`
                }
                onDoubleClick={handleDoubleClick}
                onClick={handleSingleClick}
            >
                {isSelected && (
                    <div className="
                        absolute top-2 right-2 w-6 h-6 rounded-full
                        bg-blue-600 text-white flex items-center 
                        justify-center text-sm"
                    >
                        ✓
                    </div>
                )}
                <h1 className="cursive">
                    {todo.title}
                </h1>
                {!isSelected && <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-indigo-500" onClick={() => !isSelected && editTodo()}><TbEdit /></button>
                    <button className="text-red-500" onClick={() => !isSelected && deletetodo()}><AiOutlineDelete /></button>
                </div>}
                <div className="flex items-center justify-between">
                    <div className={`text-[0.65rem] rounded-md font-semibold p-1 inline-block ${priorityStyles[todo.priority]?.badge}`}
                    >
                        <span className="flex items-center gap-1">
                            <span className={`h-2 w-2 rounded-full ${priorityStyles[todo.priority]?.dot}`}>
                            </span>
                            <span>{todo.priority}</span>
                        </span>
                    </div>
                    <div className="text-[0.65rem] rounded-md font-semibold p-1 inline-block bg-zinc-200/40" onClick={() => !isSelected && setIsCalendarOpen(true)}>
                        <div className="flex items-center gap-1">
                            <CiCalendar />
                            <span>{processDate(todo.dueDate)}</span>
                        </div>
                    </div>
                </div>
                <p className="text-sm max-h-16 overflow-y-auto break-words">
                    {todo.description}
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        !isSelected &&
                            toggleTodo(todo.id)
                    }}
                    className={`mt-auto self-end text-[0.65rem] px-2 py-1 rounded-md
                            ${todo.completed
                            ? 'bg-gray-300 text-gray-600'
                            : 'bg-green-500 text-white hover:bg-green-600'}
                        `}
                >
                    {todo.completed ? 'Done' : 'Mark as done'}
                </button>
            </div>

            <Calendar open={isCalendarOpen} close={(date) => closeCalendar(date)} date={todo?.dueDate} />
        </>
    )
}
