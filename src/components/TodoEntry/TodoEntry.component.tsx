import React from "react";
import {
  deleteTodo,
  moveTodoDown,
  moveTodoUp,
  toggleDone,
} from "../TodoApp/TodoApp.actions";
import { ITodoEntryProps } from "./TodoEntry";

const TodoEntry: React.FunctionComponent<ITodoEntryProps> = ({
  dispatch,
  done,
  id,
  listId,
  title,
}) => (
  <div>
    <input
      checked={done}
      onChange={() => dispatch(toggleDone(listId, id))}
      type="checkbox"
    />
    <div onClick={() => dispatch(toggleDone(listId, id))}>{title}</div>
    <button onClick={() => dispatch(moveTodoUp(listId, id))}>UP</button>
    <button onClick={() => dispatch(moveTodoDown(listId, id))}>DOWN</button>
    <button onClick={() => dispatch(deleteTodo(listId, id))}>DELETE</button>
  </div>
);

export default TodoEntry;
