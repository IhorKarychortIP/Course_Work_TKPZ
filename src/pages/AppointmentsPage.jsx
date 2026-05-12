import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LOCALSTORE_APPOINTMENTS } from '../models/constants';

function AppointmentsPage() {
  const [savedAppointments, setSavedAppointments] = useState([]);

  useEffect(() => {
    const getLocalStore = () => {
      let localData = window.localStorage.getItem(LOCALSTORE_APPOINTMENTS);
      localData = localData ? JSON.parse(localData) : [];
      setSavedAppointments(localData);
    };
    getLocalStore();
  }, []);

  const clearAppointments = () => {
    window.localStorage.removeItem(LOCALSTORE_APPOINTMENTS);
    setSavedAppointments([]);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="mb-4 fw-bold text-dark border-bottom pb-3">Мої записи до лікарів</h2>
          
          {savedAppointments.length === 0 ? (
            <div className="text-center p-5 bg-white rounded-4 shadow-sm">
              <h4 className="text-muted">У вас ще немає запланованих візитів.</h4>
            </div>
          ) : (
            <Card className="border-0 shadow-sm rounded-4 p-4">
              {savedAppointments.map(doc => (
                <div key={doc.id} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                  <div>
                    <h5 className="mb-1 text-dark fw-bold">{doc.name}</h5>
                    <span className="text-success fw-semibold">{doc.specialty}</span>
                  </div>
                  <span className="badge bg-light text-dark fs-6 border">{doc.price} грн.</span>
                </div>
              ))}
              <div className="mt-4 text-end">
                <Button variant="danger" className="rounded-pill px-4" onClick={clearAppointments}>
                  Скасувати всі записи
                </Button>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AppointmentsPage;