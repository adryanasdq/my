// import {z} from "zod";

// const toDosSchema = z.object({
//   id: z.number(),
//   title: z.string().max(25, { message: "Must be 25 or fewer characters long"}),
//   priority: z.string(),
//   desc: z.string().max(100, {message: "Must be 100 or fewer characters long"}),
//   dueDate: z.string().date().nullable()
// })

type ToDos = {
  id: number;
  title: string;
  priority: string;
  desc: string;
  dueDate: Date | null;
};

type FormProps = {
  todos: ToDos[];
  setTodos: (todos: ToDos[]) => void;
  editingTodos: ToDos | null;
  setEditingTodos: (todos: ToDos | null) => void;
}

type GridProps = {
  todos: ToDos[];
  editToDos: (todo: ToDos) => void;
  deleteToDos: (id: number) => void;
}

export type {ToDos, FormProps, GridProps}