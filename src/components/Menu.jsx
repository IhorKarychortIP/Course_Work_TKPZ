import React from 'react';
import { Nav } from 'react-bootstrap';

function Menu() {
  return (
    <Nav>
      <Nav.Link href="#services">Послуги</Nav.Link>
      <Nav.Link href="#doctors">Лікарі</Nav.Link>
      <Nav.Link href="#appointment" className="text-warning fw-bold">Запис на прийом</Nav.Link>
    </Nav>
  );
}

export default Menu;