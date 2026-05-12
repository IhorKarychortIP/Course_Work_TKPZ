import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function DoctorCard({ doctor, onSelect, isSelected, children }) {
  return (
    <Card className={`h-100 shadow-sm border-0 rounded-4 text-center overflow-hidden ${isSelected ? 'border border-success border-2' : ''}`}>
      <Card.Img 
        variant="top" 
        src={doctor.imgurl} 
        alt={doctor.name} 
        style={{ height: '220px', objectFit: 'cover' }} 
      />
      <Card.Body className="p-4 d-flex flex-column">
        <Card.Title className="fw-bold mb-2 text-dark">{doctor.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-success">{doctor.specialty}</Card.Subtitle>
        
        <Card.Text className="text-muted flex-grow-1 mb-2">
          Стаж: <strong>{doctor.experience} років</strong><br/>
          Вартість: <strong>{doctor.price} грн.</strong>
        </Card.Text>

        {/* ТУТ БУДЕ ВИВОДИТИСЯ НАШ ВИПАДАЮЧИЙ СПИСОК ПОСЛУГ */}
        {children}

        <div style={{ minHeight: '30px' }} className="mb-3 mt-2">
          {isSelected && (
            <Badge bg="success" className="px-3 py-2 rounded-pill">
              ✔ Вибрано для запису
            </Badge>
          )}
        </div>

        <Button 
          variant={isSelected ? "secondary" : "success"} 
          className="mt-auto rounded-pill fw-bold"
          onClick={() => onSelect(doctor)}
          disabled={isSelected}
        >
          {isSelected ? "Вже записані" : "Записатися на прийом"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default DoctorCard;