import React from 'react'
import Login from '../components/Login/Login'
import { Container, Col, Row } from 'react-bootstrap'

const LoginPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <Row>
        <Col>
          <Login />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage