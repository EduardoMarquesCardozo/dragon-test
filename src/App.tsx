import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
