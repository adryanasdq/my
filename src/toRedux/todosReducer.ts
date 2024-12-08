import { ToDos } from "./types/ToDosRedux";
import { Action } from "./actions";


export interface ToDosState {
    todos: ToDos[];
    nextId: number;
}

const initialState: ToDosState = {
    todos: [],
    nextId: 1,
}

const toDosReducer = (state:ToDosState = initialState, action: Action):ToDosState => {
    switch (action.type) {
        case "ADD_TODO": {
            const newToDo:ToDos = {
                id:state.nextId,
                title: action.payload.title,
                priority: action.payload.priority,
                desc: action.payload.desc,
                dueDate: action.payload.dueDate ?? null,
            }

            return {
                ...state, 
                todos: [...state.todos, newToDo],
                nextId: state.nextId + 1
            }
        }
        case "EDIT_TODO": {
            const updatedToDo = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        priority: action.payload.priority,
                        title: action.payload.title,
                        desc: action.payload.desc,
                        dueDate: action.payload.dueDate ?? null,
                    };
                }
                return todo;
            });
            return {...state, todos: updatedToDo}
        }
        case "DELETE_TODO": {
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            }
        }
        default:
            return state;
    }
}

export { toDosReducer }