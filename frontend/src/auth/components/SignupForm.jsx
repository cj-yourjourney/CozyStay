import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const SignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccess('')

    // Basic client-side validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: ['Please enter a valid email address.'] })
      return
    }
    if (password.length < 8) {
      setErrors({ password: ['Password must be at least 8 characters long.'] })
      return
    }

    // Prepare data payload
    const payload = {
      name,
      email,
      password
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/profiles/signup/',
        payload
      )
      setSuccess('Signup successful! Please check your email for verification.')
      // Reset form fields
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      // Extract and display backend validation errors
      if (err.response && err.response.data) {
        setErrors(err.response.data)
      } else {
        setErrors({
          non_field_errors: ['An unexpected error occurred. Please try again.']
        })
      }
    }
  }

  // Helper function to render field-specific errors
  const renderFieldError = (fieldName) => {
    return errors[fieldName] ? (
      <Form.Text className="text-danger">
        {errors[fieldName].join(' ')}
      </Form.Text>
    ) : null
  }

  // Helper function to render general errors
  const renderGeneralErrors = () => {
    const generalErrors = errors.non_field_errors || errors.detail
    if (generalErrors) {
      return (
        <Alert variant="danger">
          {Array.isArray(generalErrors)
            ? generalErrors.join(' ')
            : generalErrors}
        </Alert>
      )
    }
    return null
  }

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      {renderGeneralErrors()}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
            required
          />
          {renderFieldError('name')}
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            required
          />
          {renderFieldError('email')}
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
            required
          />
          {renderFieldError('password')}
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm
