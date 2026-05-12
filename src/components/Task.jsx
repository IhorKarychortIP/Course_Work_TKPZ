import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';

function Task({ task, onDelete, onToggle }) {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-0 shadow-sm mb-2 rounded-4">
      <div className="d-flex align-items-center gap-3">
        <Form.Check 
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="fs-5 text-success"
        />
        <span 
          style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
          className={task.completed ? 'text-muted' : 'text-dark fw-medium'}
          onClick={() => onToggle(task.id)}
        >
          {task.name}
        </span>
      </div>
      <Button variant="outline-danger" size="sm" className="rounded-pill px-3" onClick={() => onDelete(task.id)}>
        Видалити
      </Button>
    </ListGroup.Item>
  );
}

export default Task;