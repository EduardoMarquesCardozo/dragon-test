import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login/Login'
import DragonList from './pages/Home/DragonList'
import DragonForm from './pages/Home/DragonForm/DragonForm'
import Header from './components/Header/Header'
import DragonDetails from './pages/Home/DragonDetails/DragonDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Header/>}>
        <Route path="/home" element={<DragonList />} />
        <Route path="/form/:id?" element={<DragonForm />} />
        <Route path="/details/:id" element={<DragonDetails />} />
      </Route>
    </Routes>
  )
}

export default App
