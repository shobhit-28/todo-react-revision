import { useContext } from 'react'
import { TodoContext } from '../../context/todoContextContainer'
import { MdDeleteForever } from 'react-icons/md'

export const DeleteMultiTodoBtn = () => {
    const { deleteMultiTodos, isAnySelected } = useContext(TodoContext)

    return (
        isAnySelected && (<div>
            <button
                className="
                  z-40 fixed bottom-4 right-20
                  text-4xl
                  bg-red-600/90 hover:bg-red-700
                  text-white
                  rounded-full
                  p-3
                  shadow-lg shadow-red-900/40
                  hover:scale-110 active:scale-95
                "
                onClick={() => deleteMultiTodos()}
            >
                <MdDeleteForever />
            </button>
        </div>)
    )
}
