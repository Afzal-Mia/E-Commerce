import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Admin from './Pages/Admin/Admin'
import Navbar from './Components/Navbar/Navbar'

const App = () => {
  return (
    <>
<Navbar/>
<Admin/>
      <div className='app'>
        <Routes>
          <Route path="/se" element={<Admin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

    </>
  )
}

export default App;