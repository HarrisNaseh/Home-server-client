// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AppHeader from './components/AppHeader'
import Home from './components/Home'
import LoginPage from './components/LoginPage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  // const [count, setCount] = useState(0)
  return (

    <div className='App'>
      < Router>
        <AppHeader />

        <Routes>
          {/* Public routes */}
          <Route path='/login' element={
            <LoginPage />
          } />

          <Route path='/logout' element={
            <LoginPage />
          } />

          {/* Protected Routes */}
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </div>
  )
}

export default App
