import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from '../pages/Home/Home'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
