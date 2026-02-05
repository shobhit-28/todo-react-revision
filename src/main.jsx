import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TodoContextHandler } from './context/todoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TodoContextHandler>
        <App />
      </TodoContextHandler>
    </BrowserRouter>
  </StrictMode>,
)
