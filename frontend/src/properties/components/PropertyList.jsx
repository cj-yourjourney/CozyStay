import React, { useEffect, useState } from 'react'
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PropertyList = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/properties/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch properties')
        }
        return response.json()
      })
      .then((data) => {
        setProperties(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  const handleViewDetails = (id) => {
    navigate(`/properties/${id}`)
  }

  if (loading) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <Row>
        {properties.map((property) => (
          <Col key={property.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={property.image}
                alt={property.title}
              />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description}</Card.Text>
                <Card.Text>
                  <strong>Price per Night:</strong> ${property.price_per_night}
                </Card.Text>
                <Card.Text>
                  <strong>Location:</strong> {property.location}
                </Card.Text>
                <Card.Text>
                  <strong>Status:</strong>{' '}
                  {property.available ? 'Available' : 'Not Available'}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(property.id)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default PropertyList
