import { Route, Routes } from 'react-router-dom'
import './App.css'
import { NavBar } from './components/navBar/navBar'
import { HomePage } from './components/homePage/homePage'
import { Calendar } from './components/calendar/calendar'
import { AddBtn } from './components/addNewTodo/addBtn/addBtn'
import { Form } from './components/addNewTodo/form/form'
import { DeleteMultiTodoBtn } from './components/deleteMultiTodoBtn/deleteMultiTodoBtn'

function App() {

  return (
    <>
      <NavBar />
      <AddBtn />
      <DeleteMultiTodoBtn />
      <Calendar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Form />
    </>
  )
}

export default App
