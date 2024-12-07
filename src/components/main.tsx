import { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { MainForm, User } from './form';
import { MainGrid } from './grid';

function Main() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Employee Data
      </Typography>
      <MainForm
        users={users}
        setUsers={setUsers}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
      <MainGrid users={users} onDelete={handleDelete} onEdit={handleEdit} />
    </Paper>
  );
}

export { Main };
