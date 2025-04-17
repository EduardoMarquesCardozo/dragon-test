import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login/Login'
import DragonList from './pages/Home/DragonList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<DragonList />} />
    </Routes>
  )
}

export default App
