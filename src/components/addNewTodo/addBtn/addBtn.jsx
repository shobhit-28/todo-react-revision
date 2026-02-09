import { useContext } from "react"
import { IoMdAdd } from "react-icons/io"
import { TodoContext } from "../../../context/todoContextContainer"

export const AddBtn = () => {
    const { openCloseTodo } = useContext(TodoContext)

    return (
        <button className="z-40 fixed block bottom-4 right-4 text-4xl bg-teal-950/90 hover:bg-teal-950 hover:text-teal-100 text-teal-100/80 rounded-full p-2" onClick={() => openCloseTodo()}><IoMdAdd /></button>
    )
}
