import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(2),
});
type User = z.infer<typeof UserSchema>;

type MainFormProps = {
  users: User[];
  setUsers: (users: User[]) => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
};

function MainForm({
  users,
  setUsers,
  editingUser,
  setEditingUser,
}: MainFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
      });
    }
  }, [editingUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const updatedUser = UserSchema.parse({
          id: editingUser.id,
          ...formData,
        });
        setUsers(
          users.map((user) => (user.id === editingUser.id ? updatedUser : user))
        );
        setEditingUser(null);
      } else {
        const newUser = UserSchema.parse({
          id: users.length + 1,
          ...formData,
        });
        setUsers([...users, newUser]);
      }
      setFormData({ name: '', email: '', role: '' });
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: '' });
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="role"
        label="Role"
        value={formData.role}
        onChange={handleInputChange}
      />
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" type="submit">
          {editingUser ? 'Update' : 'Add'}
        </Button>
        {editingUser && (
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </Stack>
    </form>
  );
}

export { MainForm, UserSchema };
export type { User };
