import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import SignupForm from './auth/components/SignupForm'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    
    </Router>
  )
}

export default App
