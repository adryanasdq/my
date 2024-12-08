import React from 'react';
import { Paper, Typography } from '@mui/material';
import { FormToDos } from './formRedux';
import { useDispatch, useSelector } from 'react-redux';
import { ToDosState } from '../todosReducer';
import { addToDo, editToDo, deleteToDo } from '../actions';
import { GridToDos } from './gridRedux';
import { ToDos } from '../types/ToDosRedux';

function MainRedux() {
  const [editingToDo, setEditingToDo] = React.useState<ToDos | null>(null);
  const todos = useSelector<ToDosState, ToDosState['todos']>(
    (state) => state.todos
  );
  const dispatch = useDispatch();

  const onAddToDos = (todo: {
    title: string;
    desc: string;
    dueDate: Date | null;
    priority: string;
  }) => {
    dispatch(addToDo(todo.title, todo.desc, todo.dueDate, todo.priority));
  };

  const onEditToDos = (todo: {
    id: number;
    title: string;
    desc: string;
    dueDate: Date | null;
    priority: string;
  }) => {
    dispatch(
      editToDo(todo.id, todo.title, todo.desc, todo.dueDate, todo.priority)
    );
  };

  const onDeleteToDos = (id: number) => {
    dispatch(deleteToDo(id));
  };

  const handleEditClick = (todo: ToDos) => {
    setEditingToDo(todo);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
        Redux To-Do List
      </Typography>
      <FormToDos
        addToDos={onAddToDos}
        editToDos={onEditToDos}
        editingToDo={editingToDo}
        resetEditingToDo={() => setEditingToDo(null)}
      />
      <GridToDos
        todos={todos}
        editToDos={handleEditClick}
        deleteToDos={onDeleteToDos}
      />
    </Paper>
  );
}
export { MainRedux };
