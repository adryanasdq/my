import { z } from 'zod';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, SelectChangeEvent } from '@mui/material';
import { ToDos } from '../types/ToDosRedux';
import { CustomSelect } from '../../components/common/CustomSelect';
import { CustomButton } from '../../components/common/CustomButton';
import { todoSchema, TodoSchemaType } from '../schemas/toDosSchema';
import { CustomTextField } from '../../components/common/CustomTextField';

interface ToDosProps {
  addToDos(todo: {
    title: string;
    desc: string;
    dueDate: Date | null;
    priority: string;
  }): void;
  editToDos?: (todo: {
    id: number;
    title: string;
    desc: string;
    dueDate: Date | null;
    priority: string;
  }) => void;
  editingToDo: ToDos | null;
  resetEditingToDo: () => void;
}

export const FormToDos: FC<ToDosProps> = ({
  addToDos,
  editToDos,
  editingToDo,
  resetEditingToDo,
}) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof TodoSchemaType, string>>
  >({});
  const [input, setInput] = useState({
    id: editingToDo?.id || 0,
    priority: editingToDo?.priority || '',
    title: editingToDo?.title || '',
    desc: editingToDo?.desc || '',
    dueDate: editingToDo?.dueDate || null,
  });

  const validateForm = () => {
    try {
      todoSchema.parse(input);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedError = err.errors.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.path[0]]: curr.message,
          }),
          {}
        );
        setErrors(formattedError);
      }
      return false;
    }
  };

  useEffect(() => {
    if (editingToDo) {
      setInput({
        id: editingToDo.id,
        priority: editingToDo.priority,
        title: editingToDo.title,
        desc: editingToDo.desc,
        dueDate: editingToDo.dueDate,
      });
    }
  }, [editingToDo]);

  const handleChange = (e: SelectChangeEvent) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleDateChange = (val: Date | null) => {
    setInput({ ...input, dueDate: val });
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingToDo && editToDos) {
      editToDos({
        id: input.id,
        priority: input.priority,
        title: input.title,
        desc: input.desc,
        dueDate: input.dueDate,
      });
    } else {
      addToDos({
        priority: input.priority,
        title: input.title,
        desc: input.desc,
        dueDate: input.dueDate,
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setInput({
      id: 0,
      priority: '',
      title: '',
      desc: '',
      dueDate: null,
    });
    resetEditingToDo();
    setErrors({});
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Box sx={{ display: 'flex', minWidth: 100, gap: 2, mb: 1 }}>
        <CustomSelect
          width="25%"
          label="Priority"
          name="priority"
          value={input.priority}
          onChange={(e) => handleChange(e as SelectChangeEvent)}
          options={[
            { value: 'High', label: 'High' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Low', label: 'Low' },
          ]}
        />

        <CustomTextField
          name="title"
          label="Title"
          value={input.title}
          placeholder="Enter task title"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
          error={!!errors.title}
          helperText={errors.title}
          sx={{
            width: '75%',
            mt: 0,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: errors.title ? 'red' : undefined,
              },
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', minWidth: 100, gap: 2, mb: 1 }}>
        <CustomTextField
          name="desc"
          label="Description"
          value={input.desc}
          placeholder="Enter task description"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
          error={!!errors.desc}
          helperText={errors.desc}
          sx={{
            width: '75%',
            mt: 0,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: errors.desc ? 'red' : undefined,
              },
            },
          }}
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
      <CustomButton
        label={editingToDo ? 'Update' : 'Add'}
        variant="contained"
        type="submit"
      />
      <CustomButton label="Reset" onClick={resetForm} />
    </form>
  );
};
