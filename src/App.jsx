import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider, AuthContext } from './context/AuthContext';

import AuthPage from './pages/AuthPage';
import DoctorsPage from './pages/DoctorsPage';
import About from './pages/About';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#20c997' }} variant="dark" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">MedClinic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-3">
            <Nav.Link as={Link} to="/about" className="text-white fw-semibold">Про нас</Nav.Link>
            
            {user?.role === 'patient' && (
              <>
                <Nav.Link as={Link} to="/doctors" className="text-white fw-semibold">Записатися до лікаря</Nav.Link>
                <Nav.Link as={Link} to="/patient-dashboard" className="text-warning fw-bold">Мій кабінет</Nav.Link>
              </>
            )}

            {user?.role === 'doctor' && (
              <Nav.Link as={Link} to="/doctor-dashboard" className="text-warning fw-bold">Робочий стіл лікаря</Nav.Link>
            )}
          </Nav>
          
          <Nav>
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-white fw-medium">Привіт, {user.name}</span>
                <Button variant="outline-light" size="sm" className="rounded-pill" onClick={handleLogout}>Вийти</Button>
              </div>
            ) : (
              <Button as={Link} to="/auth" variant="light" className="rounded-pill text-success fw-bold">Увійти / Реєстрація</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f4fbf8' }}>
          <Navigation />
          <div className="py-5 flex-grow-1">
            <Routes>
              <Route path="/" element={<div className="text-center mt-5"><h1>Ласкаво просимо до MedClinic!</h1></div>} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;