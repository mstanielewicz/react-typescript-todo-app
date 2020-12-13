import React from "react";
import TodoForm from "../TodoForm";
import reducer, { initialState } from "./TodoApp.reducer";

const TodoApp = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      {JSON.stringify(state)}
      <TodoForm dispatch={dispatch} />
    </div>
  );
};

export default TodoApp;
