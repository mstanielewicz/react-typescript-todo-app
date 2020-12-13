import shortid from "shortid";
import { TodoAppActionType } from "./TodoApp";

export const updateListName = (
  listId: string,
  name: string
): TodoAppActionType => ({
  type: "UPDATE_LIST_NAME",
  listId,
  name,
});

export const addTodo = (
  listId: string,
  todo: {
    date: string;
    title: string;
  }
): TodoAppActionType => ({
  type: "ADD_TODO",
  listId,
  todo: {
    ...todo,
    done: false,
    id: shortid.generate(),
  },
});

export const toggleDone = (listId: string, id: string): TodoAppActionType => ({
  type: "TOGGLE_DONE",
  id,
  listId,
});

export const deleteTodo = (listId: string, id: string): TodoAppActionType => ({
  type: "DELETE_TODO",
  id,
  listId,
});

export const moveTodoUp = (listId: string, id: string): TodoAppActionType => ({
  type: "MOVE_TODO_UP",
  id,
  listId,
});

export const moveTodoDown = (
  listId: string,
  id: string
): TodoAppActionType => ({
  type: "MOVE_TODO_DOWN",
  id,
  listId,
});
