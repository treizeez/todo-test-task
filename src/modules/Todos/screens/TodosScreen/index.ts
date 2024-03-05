import { connect } from "react-redux";

import { Store } from "@root/redux";

import { todoActions } from "@modules/Todos/store/todoReducer";

import TodosScreen from "./view";

export default connect(
  (state: Store) => ({
    todos: state.todos.data,
  }),
  {
    addTodo: todoActions.addTodo,
    completeTodo: todoActions.completeTodo,
  }
)(TodosScreen);
