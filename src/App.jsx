import { Route, Routes } from 'react-router-dom'
import './App.css'
import { NavBar } from './components/navBar/navBar'
import { HomePage } from './components/homePage/homePage'
import { Calendar } from './components/calendar/calendar'

function App() {

  return (
    <>
      <NavBar />
      <Calendar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
