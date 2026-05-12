import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, ButtonGroup, ListGroup } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function PatientDashboard() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');

  const loadAppointments = useCallback(() => {
    if (!user) return;
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    setAppointments(all.filter(app => app.patientId === user.id));
  }, [user]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const cancelAppointment = (id) => {
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    const updated = all.map(app => 
      app.id === id ? { ...app, status: 'cancelled' } : app
    );
    localStorage.setItem('global_appointments', JSON.stringify(updated));
    loadAppointments();
  };

  const filtered = appointments.filter(app => {
    if (filter === 'completed') return app.status === 'completed';
    if (filter === 'pending') return app.status === 'pending';
    if (filter === 'cancelled') return app.status === 'cancelled'; 
    return true;
  });

  if (!user) return null;

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-4 p-4">
            <h2 className="text-center fw-bold mb-4">Мої медичні записи</h2>
            
            <div className="d-flex justify-content-center mb-4">
              <ButtonGroup className="flex-wrap">
                <Button variant={filter === 'all' ? "success" : "light"} onClick={() => setFilter('all')}>Всі</Button>
                <Button variant={filter === 'pending' ? "success" : "light"} onClick={() => setFilter('pending')}>Очікується</Button>
                <Button variant={filter === 'completed' ? "success" : "light"} onClick={() => setFilter('completed')}>Завершено</Button>
                <Button variant={filter === 'cancelled' ? "success" : "light"} onClick={() => setFilter('cancelled')}>Скасовано</Button>
              </ButtonGroup>
            </div>

            <ListGroup variant="flush">
              {filtered.map(app => (
                <ListGroup.Item key={app.id} className="py-3 border-0 shadow-sm mb-3 rounded-4 d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-1">{app.doctorName}</h5>
                    <small className="text-success d-block mb-2">{app.doctorSpecialty}</small>
                    <Badge bg={
                      app.status === 'pending' ? 'warning' : 
                      app.status === 'completed' ? 'info' : 'secondary'
                    } className="text-dark">
                      {app.status === 'pending' ? 'Очікується' : 
                       app.status === 'completed' ? 'Пройдено' : 'Скасовано'}
                    </Badge>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold mb-2">{app.price} грн</div>
                    {app.status === 'pending' && (
                      <Button variant="outline-danger" size="sm" className="rounded-pill" onClick={() => cancelAppointment(app.id)}>
                        Скасувати
                      </Button>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
              {filtered.length === 0 && <p className="text-center text-muted">Записів не знайдено.</p>}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PatientDashboard;