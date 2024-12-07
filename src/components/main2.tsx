import { useState } from 'react';
import { MyForm } from './form2';
import { MyGrid } from './grid2';
import { ToDos } from '../types/ToDos';
import { Paper, Typography } from '@mui/material';

function Main2() {
  const [todos, setTodos] = useState<ToDos[]>([]);
  const [editingTodos, setEditingTodos] = useState<ToDos | null>(null);

  const handleEdit = (id: number) => {
    const foundTodo = todos.find((o) => o.id === id);
    setEditingTodos(foundTodo || null);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
        To-Do List
      </Typography>
      <MyForm
        todos={todos}
        setTodos={setTodos}
        editingTodos={editingTodos}
        setEditingTodos={setEditingTodos}
      />
      <MyGrid todos={todos} editTodos={handleEdit} deleteTodos={handleDelete} />
    </Paper>
  );
}

export { Main2 };
