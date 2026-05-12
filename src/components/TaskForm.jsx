import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAdd(taskName.trim());
      setTaskName('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Введіть нове медичне завдання..."
          className="rounded-start-pill ps-4"
        />
        <Button type="submit" variant="success" className="rounded-end-pill px-4 fw-bold">
          Додати
        </Button>
      </InputGroup>
    </Form>
  );
}

export default TaskForm;