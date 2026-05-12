import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Task from './Task';

function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p className="text-center text-muted mt-4">Список завдань порожній.</p>;
  }

  return (
    <ListGroup className="bg-transparent">
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      ))}
    </ListGroup>
  );
}

export default TaskList;