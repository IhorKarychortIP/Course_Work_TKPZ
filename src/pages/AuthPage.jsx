import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'patient', name: '' });
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        alert('Помилка входу. Перевірте email та пароль.');
      }
    } else {
      if (!formData.name) return alert('Введіть ПІБ');
      const result = await register(formData.email, formData.password, formData.role, formData.name);
      if (result.success) {
        alert('Реєстрація успішна! Ви автоматично увійшли.');
        navigate('/');
      } else {
        alert('Помилка реєстрації: ' + result.error);
      }
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm border-0 rounded-4" style={{ width: '400px' }}>
        <h3 className="text-center fw-bold mb-4">{isLogin ? 'Вхід' : 'Реєстрація'}</h3>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>ПІБ (як у каталозі, якщо ви лікар)</Form.Label>
                <Form.Control type="text" name="name" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Роль</Form.Label>
                <Form.Select name="role" onChange={handleChange}>
                  <option value="patient">Пацієнт</option>
                  <option value="doctor">Лікар</option>
                </Form.Select>
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Пароль (мінімум 6 символів)</Form.Label>
            <Form.Control type="password" name="password" onChange={handleChange} required minLength="6"/>
          </Form.Group>
          <Button type="submit" variant="success" className="w-100 rounded-pill fw-bold mb-3">
            {isLogin ? 'Увійти' : 'Зареєструватися'}
          </Button>
        </Form>
        <div className="text-center">
          <Button variant="link" className="text-muted" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default AuthPage;