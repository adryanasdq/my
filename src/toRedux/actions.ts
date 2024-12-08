const ADD_TODO = 'ADD_TODO';
const EDIT_TODO = 'EDIT_TODO';
const DELETE_TODO = 'DELETE_TODO';

export type AddToDoAction = {
    type: typeof ADD_TODO, 
    payload: {
        title: string;
        desc: string;
        dueDate: Date | null;
        priority: string;
    };
}

export type EditToDoAction = {
    type: typeof EDIT_TODO,
    payload: {
        id: number;
        title: string;
        desc: string;
        dueDate: Date | null;
        priority: string;
    };
}

export type DeleteToDoAction = {
    type: typeof DELETE_TODO,
    payload: {
        id: number;
    };
}

// Union all type of actions
export type Action = AddToDoAction | EditToDoAction | DeleteToDoAction;

export const addToDo = (
    title: string, 
    desc: string, 
    dueDate: Date | null, 
    priority: string
):AddToDoAction => ({
    type: "ADD_TODO", 
    payload: { title, desc, dueDate, priority },
})

export const editToDo = (
    id: number, 
    title: string, 
    desc: string, 
    dueDate: Date | null, 
    priority: string
):EditToDoAction => ({
    type: "EDIT_TODO", 
    payload: { id, title, desc, dueDate, priority },
})

export const deleteToDo = (id:number): DeleteToDoAction => ({
    type: "DELETE_TODO",
    payload: {id},
})