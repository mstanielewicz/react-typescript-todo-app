import React from "react";
import TodoList from "../TodoList";
import reducer, { initialState } from "./TodoApp.reducer";

const TodoApp = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      {JSON.stringify(state)}

      {state.todoLists.map((list) => (
        <TodoList dispatch={dispatch} key={list.id} {...list} />
      ))}
    </div>
  );
};

export default TodoApp;
