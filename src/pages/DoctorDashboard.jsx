import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, ButtonGroup, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

function DoctorDashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const loadTasks = useCallback(() => {
    if (!user) return;
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    // Сортуємо задачі за датою (спочатку найближчі)
    const myTasks = all.filter(app => app.doctorId === user.id || app.doctorName === user.name);
    myTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    setTasks(myTasks);
  }, [user]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const updateStatus = (id, newStatus) => {
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    const updated = all.map(app => app.id === id ? { ...app, status: newStatus } : app);
    localStorage.setItem('global_appointments', JSON.stringify(updated));
    loadTasks();
    toast.info(newStatus === 'cancelled' ? "Запис скасовано" : "Статус оновлено");
  };

  const clearHistory = () => {
    if (window.confirm("Видалити завершені та скасовані записи з вашого кабінету?")) {
      const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
      const updated = all.filter(app => (app.doctorId !== user.id && app.doctorName !== user.name) || app.status === 'pending');
      localStorage.setItem('global_appointments', JSON.stringify(updated));
      loadTasks();
      toast.dark("Історію прийомів очищено");
    }
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
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">Мій кабінет</h2>
              <Button variant="outline-secondary" size="sm" onClick={clearHistory}>
                Очистити історію
              </Button>
            </div>
            
            <div className="d-flex justify-content-center mb-4">
              <ButtonGroup className="flex-wrap shadow-sm">
                <Button variant={filter === 'all' ? "primary" : "light"} onClick={() => setFilter('all')}>
                  Всі
                </Button>
                <Button variant={filter === 'pending' ? "primary" : "light"} onClick={() => setFilter('pending')}>
                  Очікується
                </Button>
                <Button variant={filter === 'completed' ? "primary" : "light"} onClick={() => setFilter('completed')}>
                  Завершено
                </Button>
                <Button variant={filter === 'cancelled' ? "primary" : "light"} onClick={() => setFilter('cancelled')}>
                  Скасовано
                </Button>
              </ButtonGroup>
            </div>

            <ListGroup variant="flush">
              {filtered.map(task => (
                <ListGroup.Item key={task.id} className="py-3 border-0 shadow-sm mb-3 rounded-4 d-flex justify-content-between align-items-center bg-light">
                  <div>
                    <h5 className="fw-bold mb-1">{task.patientName}</h5>
                    <p className="text-primary small mb-1">Запис на: <strong>{task.serviceType}</strong></p>
                    <p className="text-dark small mb-2">Дата: <strong>{task.date} о {task.time}</strong></p>
                    
                    <Badge bg={
                      task.status === 'pending' ? 'warning' : 
                      task.status === 'completed' ? 'info' : 'secondary'
                    } className="text-dark">
                      {task.status === 'pending' ? 'Очікується' : 
                       task.status === 'completed' ? 'Пройдено' : 'Скасовано'}
                    </Badge>
                  </div>
                  <div className="d-flex gap-2">
                    {task.status === 'pending' && (
                      <>
                        <Button variant="success" size="sm" className="rounded-pill px-3" onClick={() => updateStatus(task.id, 'completed')}>
                          Виконати
                        </Button>
                        <Button variant="outline-danger" size="sm" className="rounded-pill px-3" onClick={() => updateStatus(task.id, 'cancelled')}>
                          Скасувати
                        </Button>
                      </>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
              {filtered.length === 0 && <p className="text-center text-muted my-5">Записів не знайдено.</p>}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DoctorDashboard;