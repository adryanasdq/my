import { useState, useEffect } from 'react';
import { z } from 'zod';
import { ToDos, FormProps } from '../types/ToDos';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Select,
  SelectChangeEvent,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';

const toDosSchema = z.object({
  title: z.string().min(3),
  priority: z.string(),
  desc: z.string().min(3),
  dueDate: z.date().nullable(),
});

function MyForm({ todos, setTodos, editingTodos, setEditingTodos }: FormProps) {
  const [error, setError] = useState<z.ZodError | null>(null);
  const [input, setInput] = useState({
    priority: '',
    title: '',
    desc: '',
    dueDate: null as Date | null,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChange = (e: SelectChangeEvent) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDateChange = (val: Date | null) => {
    setInput({ ...input, dueDate: val });
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = toDosSchema.safeParse(input);
    if (!result.success) {
      setError(result.error);
      return;
    }
    if (editingTodos) {
      const updatedTodos = {
        id: editingTodos.id,
        ...input,
      };
      setTodos(
        todos.map((todo) => (todo.id === editingTodos.id ? updatedTodos : todo))
      );
    } else {
      const newTodo: ToDos = {
        id: todos.length + 1,
        priority: input.priority,
        title: input.title,
        desc: input.desc,
        dueDate: input.dueDate,
      };

      setTodos([...todos, newTodo]);
    }

    resetForm();
    setError(null);
  };

  const resetForm = () => {
    setInput({
      priority: '',
      title: '',
      desc: '',
      dueDate: null,
    });
    setEditingTodos(null);
    setError(null);
  };

  useEffect(() => {
    if (editingTodos) {
      setInput({
        priority: editingTodos.priority,
        title: editingTodos.title,
        desc: editingTodos.desc,
        dueDate: editingTodos.dueDate,
      });
    }
  }, [editingTodos]);

  return (
    <form onSubmit={handleAdd}>
      <Box sx={{ display: 'flex', minWidth: 100, gap: 2, mb: 1 }}>
        <FormControl
          sx={{
            width: '25%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: error ? 'red' : '',
              },
            },
          }}
          required
        >
          <InputLabel>Priority</InputLabel>
          <Select
            id="priority"
            name="priority"
            value={input.priority}
            label="priority"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>- Select Priority -</em>
            </MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'Low'}>Low</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: '75%', mt: 0 }}
          margin="normal"
          name="title"
          label="Title"
          value={input.title}
          placeholder="Enter task title"
          onChange={handleInput}
        />
      </Box>
      <Box sx={{ display: 'flex', minWidth: 100, gap: 2, mb: 1 }}>
        <TextField
          sx={{ width: '75%', mt: 0 }}
          margin="normal"
          name="desc"
          label="Description"
          value={input.desc}
          placeholder="Enter task description"
          onChange={handleInput}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ width: '25%' }}
            format="dd-MMM-yyyy"
            name="dueDate"
            label="Due To"
            value={input.dueDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </Box>
      <Button variant="contained" type="submit">
        {editingTodos ? 'Update' : 'Add'}
      </Button>
      <Button onClick={resetForm}>Reset</Button>
    </form>
  );
}

export { MyForm };
