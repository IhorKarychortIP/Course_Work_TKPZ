import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, ButtonGroup, ListGroup } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function DoctorDashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const loadTasks = useCallback(() => {
    if (!user) return;
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    setTasks(all.filter(app => app.doctorId === user.id || app.doctorName === user.name));
  }, [user]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const updateStatus = (id, newStatus) => {
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    const updated = all.map(app => app.id === id ? { ...app, status: newStatus } : app);
    localStorage.setItem('global_appointments', JSON.stringify(updated));
    loadTasks();
  };

  const filtered = tasks.filter(t => {
    if (filter === 'completed') return t.status === 'completed';
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'cancelled') return t.status === 'cancelled';
    return true;
  });

  if (!user) return null;

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-4 p-4">
            <h2 className="text-center fw-bold mb-4">Графік прийому пацієнтів</h2>
            
            <div className="d-flex justify-content-center mb-4">
              <ButtonGroup className="flex-wrap">
                <Button variant={filter === 'all' ? "primary" : "light"} onClick={() => setFilter('all')}>Всі</Button>
                <Button variant={filter === 'pending' ? "primary" : "light"} onClick={() => setFilter('pending')}>Очікується</Button>
                <Button variant={filter === 'completed' ? "primary" : "light"} onClick={() => setFilter('completed')}>Завершено</Button>
                <Button variant={filter === 'cancelled' ? "primary" : "light"} onClick={() => setFilter('cancelled')}>Скасовано</Button>
              </ButtonGroup>
            </div>

            <ListGroup variant="flush">
              {filtered.map(task => (
                <ListGroup.Item key={task.id} className="py-3 border-0 shadow-sm mb-3 rounded-4 d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-2">{task.patientName}</h5>
                    <Badge bg={
                      task.status === 'pending' ? 'primary' : 
                      task.status === 'completed' ? 'success' : 'secondary'
                    }>
                      {task.status === 'pending' ? 'В черзі' : 
                       task.status === 'completed' ? 'Прийнято' : 'Скасовано'}
                    </Badge>
                  </div>
                  <div className="d-flex gap-2">
                    {task.status === 'pending' && (
                      <>
                        <Button variant="success" size="sm" className="rounded-pill" onClick={() => updateStatus(task.id, 'completed')}>
                          Виконати
                        </Button>
                        <Button variant="outline-danger" size="sm" className="rounded-pill" onClick={() => updateStatus(task.id, 'cancelled')}>
                          Скасувати
                        </Button>
                      </>
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

export default DoctorDashboard;