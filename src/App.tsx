// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AppHeader from './components/AppHeader'
import Home from './components/Home'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  // const [count, setCount] = useState(0)
  return (

    <div className='App'>
      < Router>
      <AppHeader/>
      <Routes>
        <Route path='/' element= {<Home/>}></Route>
      </Routes>
      </Router>
    </div>
  )
}

export default App
