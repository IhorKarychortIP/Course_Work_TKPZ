import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Card } from 'react-bootstrap';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function TodoPage() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('clinicTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    localStorage.setItem('clinicTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name) => {
    setTasks([...tasks, { id: Date.now(), name, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'uncompleted') return !task.completed;
    return true;
  });

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="border-0 shadow-sm rounded-4 p-4">
            <h2 className="text-center fw-bold text-dark mb-4">Завдання персоналу</h2>
            
            <TaskForm onAdd={addTask} />

            <div className="d-flex justify-content-center mb-4">
              <ButtonGroup className="shadow-sm">
                <Button variant={filter === 'all' ? "success" : "light"} onClick={() => setFilter('all')}>
                  Всі
                </Button>
                <Button variant={filter === 'uncompleted' ? "success" : "light"} onClick={() => setFilter('uncompleted')}>
                  Не виконані
                </Button>
                <Button variant={filter === 'completed' ? "success" : "light"} onClick={() => setFilter('completed')}>
                  Виконані
                </Button>
              </ButtonGroup>
            </div>

            <TaskList tasks={filteredTasks} onDelete={deleteTask} onToggle={toggleTask} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoPage;