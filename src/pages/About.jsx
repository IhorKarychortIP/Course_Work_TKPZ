import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      <Row className="align-items-center mb-5">
        <Col lg={6}>
          <h1 className="fw-bold text-success mb-4">Про MedClinic</h1>
          <p className="lead">Ми — сучасна приватна поліклініка, що об'єднує досвідчених лікарів та новітні цифрові технології для вашого комфорту.</p>
          <p>Наша місія — забезпечити доступну та високоякісну медичну допомогу кожному пацієнту без черг та зайвого стресу.</p>
        </Col>
        <Col lg={6}>
          <img src="https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb" alt="Clinic" className="img-fluid rounded-4 shadow" />
        </Col>
      </Row>
      <Row className="g-4 text-center">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-4 rounded-4">
            <h3 className="text-success fw-bold">15+</h3>
            <p className="text-muted">Кваліфікованих лікарів</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-4 rounded-4">
            <h3 className="text-success fw-bold">10k+</h3>
            <p className="text-muted">Щасливих пацієнтів</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm p-4 rounded-4">
            <h3 className="text-success fw-bold">24/7</h3>
            <p className="text-muted">Онлайн-запис</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;