import React from "react";
import Login from "../components/Login/Login";
import { Container, Col, Row } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center layoutHeight">
      <Row>
        <Col className="d-flex aling-items-center">
          <Login />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
