import React, { useState } from 'react';
import { Card, Button, Badge, Container, Row, Col, Modal } from 'react-bootstrap';

const patientsData = [
  { id: "4815162342", name: "Олександр Петренко", doctor: "д-р Коваленко", date: "20 лютого 2026", status: "Здоровий", type: "Плановий огляд", details: "Скарг немає. Тиск 120/80. Наступний огляд через рік." },
  { id: "1234567890", name: "Марія Іваненко", doctor: "д-р Лисенко", date: "22 лютого 2026", status: "Лікування", type: "Консультація", details: "Призначено курс антибіотиків. Повторний візит через 7 днів." },
  { id: "9876543210", name: "Іван Сидоренко", doctor: "д-р Коваленко", date: "23 лютого 2026", status: "Обстеження", type: "Аналізи", details: "Очікування результатів аналізу крові." },
  { id: "5556667778", name: "Олена Ткачук", doctor: "д-р Мельник", date: "24 лютого 2026", status: "Здоровий", type: "Вакцинація", details: "Проведено планову вакцинацію. Реакція нормальна." }
];

function PatientCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleShow = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  return (
    <div className="py-4">
      <Container>
        <h2 className="mb-4 text-start fw-bold text-dark">База пацієнтів</h2>
        <Row className="g-4">
          {patientsData.map((patient, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card 
                className={`h-100 border-2 rounded-4 ${hoveredCard === patient.id ? 'border-success shadow' : 'border-light shadow-sm'}`}
                onMouseEnter={() => setHoveredCard(patient.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ transition: 'all 0.3s ease' }}
              >
                <Card.Body className="p-4 d-flex flex-column">
                  <Card.Title className="fs-4 fw-bold text-dark mb-1">{patient.name}</Card.Title>
                  <Card.Subtitle className="mb-4 text-muted">ID: #{patient.id}</Card.Subtitle>
                  <Card.Text className="lh-lg flex-grow-1">
                    <strong>Останній візит:</strong> {patient.date}<br/>
                    <strong>Лікуючий лікар:</strong> {patient.doctor}
                  </Card.Text>
                  <div className="mb-4 mt-3">
                    <Badge bg={patient.status === "Здоровий" ? "success" : "warning"} className="me-2 px-3 py-2 rounded-pill text-white" style={{ fontSize: '0.85em' }}>
                      {patient.status}
                    </Badge>
                    <Badge bg="info" className="px-3 py-2 rounded-pill text-white" style={{ fontSize: '0.85em' }}>
                      {patient.type}
                    </Badge>
                  </div>
                  <Button 
                    variant={selectedPatient?.id === patient.id ? "success" : "outline-success"}
                    className="w-100 mt-auto rounded-pill fw-bold py-2" 
                    onClick={() => handleShow(patient)}
                  >
                    Переглянути медичну карту
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleClose} centered contentClassName="border-0 rounded-4 shadow-lg overflow-hidden">
          <Modal.Header closeButton closeVariant="white" className="bg-success text-white border-0">
            <Modal.Title>Медична карта: {selectedPatient?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 lh-lg">
            <p className="mb-2"><strong>ID пацієнта:</strong> {selectedPatient?.id}</p>
            <p className="mb-2"><strong>Лікуючий лікар:</strong> {selectedPatient?.doctor}</p>
            <p className="mb-3"><strong>Дата візиту:</strong> {selectedPatient?.date}</p>
            <hr className="text-muted" />
            <p className="mb-2"><strong>Висновок лікаря:</strong></p>
            <p className="mb-0">{selectedPatient?.details}</p>
          </Modal.Body>
          <Modal.Footer className="border-2 pb-4 pe-4">
            <Button variant="secondary" onClick={handleClose} className="rounded-pill px-4 py-2">
              Закрити
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default PatientCard;