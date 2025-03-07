// LoginForm.js
import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const LoginForm = () => {
  // Initialize state for email, password, error, and success
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      // Send login request to backend
      const response = await axios.post(
        'http://127.0.0.1:8000/profiles/login/',
        {
          email,
          password
        }
      )

      // Set success message on successful login
      setSuccess(response.data.message)
    } catch (err) {
      // Handle error response from backend
      if (err.response && err.response.data) {
        setError(err.response.data)
      } else {
        setError({ non_field_errors: ['An unexpected error occurred.'] })
      }
    }
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && (
        <Alert variant="danger">
          {Object.keys(error).map((key) => (
            <div key={key}>{error[key].join(', ')}</div>
          ))}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
