import { combineReducers } from "redux";

import { todoReducer } from "@modules/Todos";

const reducer = combineReducers({ todos: todoReducer.reducer });

export default reducer;
