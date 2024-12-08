import { createStore } from "redux";
import { toDosReducer } from "./todosReducer";

export const store = createStore(toDosReducer);