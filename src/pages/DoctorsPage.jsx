import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import { AuthContext } from '../context/AuthContext';

const doctorsData = [
  { id: 1, name: "Олександр Коваленко", specialty: "Терапевт", experience: 15, price: 450, imgurl: "/imgs/doctors/doc1.jpg" },
  { id: 2, name: "Марія Лисенко", specialty: "Кардіолог", experience: 10, price: 600, imgurl: "/imgs/doctors/doc2.jpg" },
  { id: 3, name: "Іван Мельник", specialty: "Педіатр", experience: 8, price: 500, imgurl: "/imgs/doctors/doc3.jpg" },
  { id: 4, name: "Олена Ткачук", specialty: "Невролог", experience: 12, price: 550, imgurl: "/imgs/doctors/doc4.jpg" }
];

function DoctorsPage() {
  const [globalAppointments, setGlobalAppointments] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('global_appointments')) || [];
    setGlobalAppointments(apps);
  }, []);

  const handleBookAppointment = (doctor) => {
    if (!user) {
      alert("Будь ласка, увійдіть, щоб записатися.");
      navigate('/auth');
      return;
    }

    const isAlreadyBooked = globalAppointments.some(
      app => app.doctorId === doctor.id && app.patientId === user.id && app.status === 'pending'
    );

    if (isAlreadyBooked) {
      alert("Ви вже записані до цього лікаря!");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patientId: user.id, 
      doctorId: doctor.id, 
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      patientName: user.name,
      price: doctor.price,
      status: 'pending'
    };

    const updatedApps = [...globalAppointments, newAppointment];
    setGlobalAppointments(updatedApps);
    localStorage.setItem('global_appointments', JSON.stringify(updatedApps));
    
    alert(`Запис до лікаря ${doctor.name} успішно створено.`);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-start fw-bold">Наші спеціалісти</h2>
      <Row className="g-4">
        {doctorsData.map((doctor) => (
          <Col xs={12} sm={6} md={4} lg={3} key={doctor.id}>
            <DoctorCard 
              doctor={doctor} 
              onSelect={handleBookAppointment} 
              isSelected={globalAppointments.some(app => app.doctorId === doctor.id && app.patientId === user?.id && app.status === 'pending')}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DoctorsPage;