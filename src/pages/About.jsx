import React from 'react';
import { Container } from 'react-bootstrap';

function About() {
  return (
    <Container>
      <div className="bg-white p-5 rounded-4 shadow-sm mx-auto mt-4" style={{ maxWidth: '600px' }}>
        <h2 className="text-dark border-bottom border-info border-2 pb-2 mb-4">Про нас</h2>
        <p className="text-secondary fs-5" style={{ lineHeight: 1.6 }}>
          Ми вивчаємо React та маршрутизацію! 
        </p>
      </div>
    </Container>
  );
}

export default About;