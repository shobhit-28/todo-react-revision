import { TodoCard } from '../todoCard/todoCard'
import { TodoContext } from '../../context/todoContextContainer'
import { useContext } from 'react'

export const HomePage = () => {
    const todo = useContext(TodoContext)

    console.log(todo)

    return (
        <div className="page">
            <div className='flex flex-wrap justify-around gap-3'>
                {todo.todoData.map((todo) => <TodoCard todo={todo} key={todo.id} />)}
            </div>
        </div>
    )
}
