import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, ButtonGroup, ListGroup, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

function PatientDashboard() {
  const { user } = useContext(AuthContext);
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState(null);
  const [newDate, setNewDate] = useState("");
  const today = new Date().toISOString().split('T')[0];

  const load = useCallback(() => {
    if (!user) return;
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    setApps(all.filter(a => a.patientId === user.id));
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = (id, status) => {
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    const updated = all.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem('global_appointments', JSON.stringify(updated));
    load();
    toast.info(status === 'cancelled' ? "Запис скасовано" : "Дані оновлено");
  };

  const setRating = (id, val) => {
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    const updated = all.map(a => a.id === id ? { ...a, rating: val } : a);
    localStorage.setItem('global_appointments', JSON.stringify(updated));
    load();
    toast.success("Дякуємо за оцінку!");
  };

  const saveDate = (id) => {
    const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
    const updated = all.map(a => a.id === id ? { ...a, date: newDate } : a);
    localStorage.setItem('global_appointments', JSON.stringify(updated));
    setEditId(null);
    load();
    toast.success("Візит перенесено");
  };

  const clearHistory = () => {
    if (window.confirm("Видалити завершені та скасовані записи?")) {
      const all = JSON.parse(localStorage.getItem('global_appointments')) || [];
      const updated = all.filter(a => a.patientId !== user.id || a.status === 'pending');
      localStorage.setItem('global_appointments', JSON.stringify(updated));
      load();
      toast.dark("Історію очищено");
    }
  };

  const filtered = apps.filter(a => filter === 'all' ? true : a.status === filter);

  if (!user) return null;

  return (
    <Container className="py-4">
      <Card className="shadow-sm border-0 rounded-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Мій кабінет</h2>
          <Button variant="outline-secondary" size="sm" onClick={clearHistory}>Очистити історію</Button>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <ButtonGroup className="shadow-sm">
            {['all', 'pending', 'completed', 'cancelled'].map(f => (
              <Button key={f} variant={filter === f ? "success" : "light"} onClick={() => setFilter(f)} className="text-capitalize">
                {f === 'all' ? 'Всі' : f === 'pending' ? 'Очікується' : f === 'completed' ? 'Завершено' : 'Скасовано'}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <ListGroup variant="flush">
          {filtered.map(a => (
            <ListGroup.Item key={a.id} className="py-3 border-0 shadow-sm mb-3 rounded-4 bg-white">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="fw-bold mb-1">{a.doctorName} ({a.doctorSpecialty})</h5>
                  <p className="text-primary small mb-1">Послуга: {a.serviceType} | Дата: {a.date} о {a.time}</p>
                  <Badge bg={a.status === 'pending' ? 'warning' : a.status === 'completed' ? 'info' : 'secondary'} className="text-dark">
                    {a.status}
                  </Badge>
                  {a.status === 'completed' && (
                    <div className="mt-2">
                      {[1,2,3,4,5].map(s => <span key={s} style={{cursor:'pointer', color: a.rating >= s ? '#ffc107' : '#ccc'}} onClick={() => setRating(a.id, s)}>★</span>)}
                    </div>
                  )}
                </div>
                <div className="text-end">
                  <div className="fw-bold fs-5">{a.price} грн</div>
                  {a.status === 'pending' && (
                    <div className="mt-2">
                      {editId === a.id ? (
                        <div className="d-flex gap-1">
                          <Form.Control type="date" size="sm" min={today} onChange={e => setNewDate(e.target.value)} />
                          <Button variant="success" size="sm" onClick={() => saveDate(a.id)}>✔</Button>
                        </div>
                      ) : (
                        <>
                          <Button variant="link" size="sm" onClick={() => setEditId(a.id)}>Перенести</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => updateStatus(a.id, 'cancelled')}>Скасувати</Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default PatientDashboard;