import { User } from './form';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type MainGridProps = {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
};

function MainGrid({ users, onDelete, onEdit }: MainGridProps) {
  return (
    <table className="main-grid">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <IconButton
                aria-label="edit"
                onClick={() => onEdit(user)}
                color="primary"
                size="small"
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(user.id)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { MainGrid };
