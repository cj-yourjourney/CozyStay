import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import SignupForm from './auth/components/SignupForm'
import LoginForm from './auth/components/LoginForm'
import Container from './shared/components/Container'

function App() {


  return (
    <Router>
      <Container>
       
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
