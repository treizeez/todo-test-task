import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Todo } from "../types";

const TODO_REDUCER_NAME = "todos";

type TodoStore = {
  data: Todo[];
};

const INITIAL_STATE: TodoStore = {
  data: [],
};

const todoReducer = createSlice({
  name: TODO_REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    addTodo(state, action: PayloadAction<{ name: string }>) {
      state.data = [
        ...state.data,
        { name: action.payload.name, id: uuidv4(), completed: false },
      ];
    },

    completeTodo(state, action: PayloadAction<{ id: string }>) {
      state.data = state.data.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

const todoActions = todoReducer.actions;

type AddTodo = typeof todoActions.addTodo;
type CompleteTodo = typeof todoActions.completeTodo;

export { todoActions };

export type { AddTodo, CompleteTodo, TodoStore };

export default todoReducer;
