import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DoctorCard from '../components/DoctorCard';
import { AuthContext } from '../context/AuthContext';

const doctorsData = [
  { id: 1, name: "Олександр Коваленко", specialty: "Терапевт", experience: 15, price: 450, imgurl: "/imgs/doctors/doc1.jpg", 
    services: ["Огляд", "Довідка", "Вакцинація"], workingHours: ["08:00", "09:00", "10:00", "11:00"] },
  { id: 2, name: "Марія Лисенко", specialty: "Кардіолог", experience: 10, price: 600, imgurl: "/imgs/doctors/doc2.jpg", 
    services: ["ЕКГ", "УЗД серця", "Консультація"], workingHours: ["12:00", "13:00", "14:00", "15:00"] },
  { id: 3, name: "Іван Мельник", specialty: "Педіатр", experience: 8, price: 500, imgurl: "/imgs/doctors/doc3.jpg", 
    services: ["Плановий огляд", "Довідка в сад", "Патронаж"], workingHours: ["09:00", "10:00", "11:30", "12:30"] },
  { id: 4, name: "Олена Ткачук", specialty: "Невролог", experience: 12, price: 550, imgurl: "/imgs/doctors/doc4.jpg", 
    services: ["Діагностика", "Блокада", "Консультація"], workingHours: ["14:00", "15:00", "16:00", "17:00"] }
];

function DoctorsPage() {
  const [globalApps, setGlobalApps] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});
  const { user } = useContext(AuthContext);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('global_appointments')) || [];
    setGlobalApps(apps);
  }, []);

  const handleBook = (doctor) => {
    const service = selectedServices[doctor.id] || doctor.services[0];
    const date = selectedDates[doctor.id];
    const time = selectedTimes[doctor.id];

    if (!date || !time) return toast.warning("Оберіть дату та час візиту!");

    if (globalApps.some(app => app.doctorId === doctor.id && app.patientId === user.id && app.status === 'pending')) {
      return toast.error("Ви вже очікуєте прийому у цього лікаря!");
    }

    const newApp = { id: Date.now(), patientId: user.id, patientName: user.name, doctorId: doctor.id, 
      doctorName: doctor.name, doctorSpecialty: doctor.specialty, serviceType: service, 
      date, time, price: doctor.price, status: 'pending', rating: 0 };

    const updated = [...globalApps, newApp];
    setGlobalApps(updated);
    localStorage.setItem('global_appointments', JSON.stringify(updated));
    toast.success(`Ви записані до ${doctor.name} на ${date} о ${time}`);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">Наші фахівці</h2>
      <Row className="g-4">
        {doctorsData.map((doc) => (
          <Col md={4} lg={3} key={doc.id}>
            <DoctorCard doctor={doc} onSelect={handleBook} isSelected={globalApps.some(a => a.doctorId === doc.id && a.patientId === user?.id && a.status === 'pending')}>
              <Form.Group className="text-start mt-2">
                <Form.Select size="sm" className="mb-2" onChange={(e) => setSelectedServices(p => ({...p, [doc.id]: e.target.value}))}>
                  {doc.services.map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
                <Form.Control type="date" size="sm" className="mb-2" min={today} onChange={(e) => setSelectedDates(p => ({...p, [doc.id]: e.target.value}))} />
                <Form.Select size="sm" onChange={(e) => setSelectedTimes(p => ({...p, [doc.id]: e.target.value}))}>
                  <option value="">Оберіть час</option>
                  {doc.workingHours.map(t => <option key={t} value={t}>{t}</option>)}
                </Form.Select>
              </Form.Group>
            </DoctorCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DoctorsPage;